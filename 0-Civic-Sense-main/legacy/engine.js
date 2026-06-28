// engine.js - Civic Machine Learning & Automation Core

/**
 * Recalculates Priority Scores dynamically across the feed based on constraints.
 * Upvotes vs Time Pending vs Natural Urgency
 */
function rebuildPriorities(issues) {
    const today = new Date();
    
    issues.forEach(issue => {
        // Base mapping via native form input
        let score = (issue.urgency === 'High' ? 10 : (issue.urgency === 'Medium' ? 5 : 2));
        
        // Age decay/multiplier mapping
        const dateObj = new Date(issue.date);
        const diffDays = Math.floor((today - dateObj) / (1000 * 60 * 60 * 24));
        if (diffDays > 5) score += 3;
        if (diffDays > 14) score += 5; // Escalation weight
        
        // Crowd validation multiplier
        if (issue.upvotes > 10) score += 4;
        if (issue.falseResolution) score += 6; // Heavy penalization back to active

        issue.priorityScore = score;
    });
    
    // Sort purely by logical severity
    return issues.sort((a, b) => b.priorityScore - a.priorityScore);
}

/**
 * Intelligent Clustering System
 * Groups nearby similar category complaints preventing redundant deployments.
 */
function generateClusters(issues) {
    const clusters = {};
    
    // Map pending items only
    const pendingIssues = issues.filter(i => i.status === 'pending');

    pendingIssues.forEach(issue => {
        // Create an aggregation key formatting [Location-Category] 
        // Example: "Sector 62-Sanitation"
        const clusterKey = `${issue.ward}-${issue.category}`;
        
        if (!clusters[clusterKey]) {
            clusters[clusterKey] = {
                id: `CLUS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                ward: issue.ward,
                category: issue.category,
                issues: [],
                totalPriority: 0
            };
        }
        
        clusters[clusterKey].issues.push(issue);
        clusters[clusterKey].totalPriority += (issue.priorityScore || 5);
        issue.clusterGroupId = clusters[clusterKey].id; // Assign relative link back inside issue array
    });
    
    // Return array of master clusters parsing strictly instances suffering >1 issue to group
    return Object.values(clusters).filter(c => c.issues.length > 2).sort((a, b) => b.totalPriority - a.totalPriority);
}

/**
 * Generates the "Today's Work Plan" for the Command Center.
 */
function buildDailyActionPlan(issues) {
    const activeTasks = rebuildPriorities(issues);
    const generatedClusters = generateClusters(activeTasks);
    
    return {
        topClusters: generatedClusters.slice(0, 3), // Top 3 critical areas requiring batching
        criticalIndividuals: activeTasks.filter(i => i.priorityScore >= 15 && i.status === 'pending').slice(0, 5)
    };
}

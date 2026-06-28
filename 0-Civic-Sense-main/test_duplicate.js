const axios = require('axios');

async function test() {
    try {
        console.log("Submitting Issue 1 (Original)...");
        const res1 = await axios.post('http://localhost:5501/api/issues', {
            title: "Massive pothole on 5th Avenue",
            desc: "There is a huge crater that damaged my car tire.",
            location: "5th Avenue near Central Park",
            category: "Infrastructure",
            urgency: "High",
            reportedBy: "Alice"
        });
        console.log("Issue 1 Created:", res1.data.id, "| title:", res1.data.title, "| duplicateCount:", res1.data.duplicateCount, "| priorityScore:", res1.data.priorityScore);

        console.log("\nWaiting 2 seconds...");
        await new Promise(r => setTimeout(r, 2000));

        console.log("Submitting Issue 2 (Duplicate)...");
        const res2 = await axios.post('http://localhost:5501/api/issues', {
            title: "Road broken on 5th Ave",
            desc: "Deep hole in the road near the park.",
            location: "5th Avenue by Central Park",
            category: "Infrastructure",
            urgency: "High",
            reportedBy: "Bob"
        });
        
        if (res2.data.merged) {
            console.log("✅ DUPLICATE DETECTED AND MERGED!");
            console.log("Merged with ID:", res2.data.id);
            console.log("New Duplicate Count:", res2.data.duplicateCount);
            console.log("New Priority Score:", res2.data.priorityScore);
            console.log("Comments:", res2.data.comments);
        } else {
            console.log("❌ FAILED: It was treated as a unique issue.");
            console.log("New ID created:", res2.data.id);
        }

    } catch (e) {
        console.error("Test failed:", e.message);
    }
}

test();

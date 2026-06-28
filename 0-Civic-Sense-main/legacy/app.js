const API_BASE = window.location.port === '5501' ? '/api' : 'http://localhost:5501/api';

const translations = {
    en: {
        // Utility bar
        "help_support": "Help & Support",
        // Navigation
        "nav_public_feed": "Public Feed",
        "nav_report_issue": "Report Issue",
        "nav_our_works": "Our Works",
        "nav_about_us": "About Us",
        "nav_contact_us": "Contact Us",
        "nav_account": "Account",
        // Drawer
        "account_menu": "Account Menu",
        "user_profile": "User Profile",
        "admin_dashboard": "Admin Dashboard",
        "nav_login": "Login",
        // Login
        "login_welcome": "Welcome",
        "login_subtitle": "Please log in to access this feature",
        "login_username_label": "Username",
        "login_password_label": "Password",
        "login_btn": "Log In",
        // Feed
        "top_issues": "Top Issues in your area",
        "btn_list": "List",
        "btn_map": "Map",
        "map_overlay": "Interactive Issue Map (Simulated)",
        // Report Form
        "submit_issue": "Submit a New Issue",
        "submit_subtitle": "Help us improve the community by reporting local issues.",
        "issue_image": "Issue Image (Required)",
        "dropzone_text": "Drag & Drop or Click to Upload",
        "category_question": "What type of civic issue are you reporting?",
        "category_subtitle": "Select the category that best describes the issue",
        "cat_pothole": "Pothole",
        "cat_garbage": "Roadside Garbage",
        "cat_streetlight": "Broken Streetlight",
        "cat_waterlogging": "Waterlogging",
        "cat_flood": "Flood",
        "cat_dumping": "Illegal Dumping",
        "cat_parking": "Illegal Parking",
        "cat_other": "Other",
        "urgency_level": "Urgency Level",
        "urgency_low": "Low",
        "urgency_medium": "Medium",
        "urgency_high": "High",
        "description_label": "Description",
        "voice_typing": "Voice Typing",
        "location_label": "Location",
        "detect_btn": "Detect",
        "report_anonymously": "Report Anonymously 🥷",
        "receive_whatsapp": "Receive WhatsApp Updates 📲",
        "submit_report": "Submit Report",
        // Admin Dashboard
        "total_issues": "Total Issues",
        "high_priority": "High Priority",
        "resolved": "Resolved",
        "daily_action_plan": "Daily Action Plan",
        "ai_grouping": "AI Grouping Active",
        "issue_management": "Issue Management",
        "ml_enhanced": "ML Enhanced View",
        "all_areas": "All Areas",
        "all_categories": "All Categories",
        "th_id_date": "ID & Date",
        "th_issue_details": "Issue details",
        "th_insights": "Insights (ML)",
        "th_status": "Status",
        "th_action": "Action",
        // Profile
        "citizen_user": "Citizen User",
        "profile_subtitle": "Joined: January 2024 • Active Member",
        "issues_reported": "Issues Reported",
        "issues_resolved": "Issues Resolved",
        "upvotes_given": "Upvotes Given",
        "my_reports": "My Active & Completed Reports",
        // About
        "about_title": "About CivicConnect",
        "about_subtitle": "Empowering citizens to build better communities.",
        "about_p1": "CivicConnect is a modern, community-driven platform designed to bridge the gap between citizens and local authorities. Our mission is to provide an accessible and transparent way for residents to report local issues such as infrastructure damage, sanitation problems, and safety hazards.",
        "about_p2": "By leveraging technology and community participation, we aim to streamline the resolution process and foster a collaborative environment where everyone can contribute to the betterment of our city.",
        "key_features": "Key Features",
        "feature_1": "Real-time issue reporting with image and location support",
        "feature_2": "Community upvoting system to prioritize critical problems",
        "feature_3": "ML-enhanced dashboard for administrators",
        "feature_4": "Transparent tracking of issue resolution status",
        "vision_title": "Our Vision & History",
        "vision_p1": "Founded in 2024, CivicConnect started with a simple belief: that everyday citizens are the best observers of their local environment. We realized that while many people notice broken streetlights, potholes, and sanitation issues on their daily commutes, the friction involved in reporting these issues often discourages action.",
        "vision_p2": "We envision a future where cities are responsive and resilient. By applying modern web development paradigms and machine learning, we're cutting through the red tape of local administration and bringing action directly to the smartphones of citizens. Our platform not only routes issues to the correct municipal departments but also provides public transparency on resolution timelines.",
        "vision_p3": "Over the coming years, we plan to expand our integrations directly into city backend services, making the feedback loop even faster. We believe in open data, open communication, and the power of a connected community.",
        "our_team": "Our Team",
        "role_founder": "Founder & CEO",
        "role_developer": "Lead Developer",
        "role_community": "Community Manager",
        // Contact
        "contact_title": "Contact CivicConnect",
        "contact_subtitle": "Reach out securely to operational headquarters or trigger emergency infrastructure responses.",
        "emergency_hotlines": "Emergency Hotlines",
        "official_directories": "Official Directories",
        "central_hq": "Central HQ Office",
        "sla_title": "Service Level Delivery (SLA) Matrix",
        "sla_24h": "24 Hours",
        "sla_24h_desc": "High Urgency Responses",
        "sla_3d": "3 Days",
        "sla_3d_desc": "Standard Batch SLA",
        "sla_15d": "15 Days",
        "sla_15d_desc": "Automated Maximum Neglect Limits",
        // Works
        "works_title": "Our Works & Impact",
        "works_subtitle": "Discover how CivicConnect has actively transformed the local community infrastructure through crowd-sourced vigilance.",
        // Signup & Google Auth
        "signup_btn": "Sign Up",
        "signup_title": "Create Account",
        "signup_subtitle": "Join the CivicConnect community today",
        "signup_fullname_label": "Full Name",
        "signup_email_label": "Email Address",
        "signup_username_label": "Choose Username",
        "signup_password_label": "Password",
        "signup_confirm_label": "Confirm Password",
        "login_gmail": "Continue with Google",
        "signup_gmail": "Sign up with Google",
        "or_divider": "or",
        "no_account": "Don't have an account?",
        "signup_link": "Sign up here",
        "have_account": "Already have an account?",
        "login_link": "Log in here",
        "login_welcome": "Welcome Back",
        // Account Settings
        "account_settings": "Account Settings",
        "admin_settings": "Admin Account Settings",
        "change_password": "Change Password",
        "current_password": "Current Password",
        "new_password": "New Password",
        "confirm_new_password": "Confirm New Password",
        "save_password": "Save Password",
        "change_email": "Change Email",
        "current_email": "Current Email",
        "new_email": "New Email",
        "save_email": "Save Email",
        "change_phone": "Change Phone Number",
        "current_phone": "Current Phone",
        "new_phone": "New Phone Number",
        "save_phone": "Save Phone"
    },
    hi: {
        // Utility bar
        "help_support": "सहायता और समर्थन",
        // Navigation
        "nav_public_feed": "सार्वजनिक फ़ीड",
        "nav_report_issue": "समस्या दर्ज करें",
        "nav_our_works": "हमारे कार्य",
        "nav_about_us": "हमारे बारे में",
        "nav_contact_us": "संपर्क करें",
        "nav_account": "खाता",
        // Drawer
        "account_menu": "खाता मेनू",
        "user_profile": "उपयोगकर्ता प्रोफ़ाइल",
        "admin_dashboard": "प्रशासक डैशबोर्ड",
        "nav_login": "लॉगिन",
        // Login
        "login_welcome": "स्वागत है",
        "login_subtitle": "इस सुविधा का उपयोग करने के लिए कृपया लॉगिन करें",
        "login_username_label": "उपयोगकर्ता नाम",
        "login_password_label": "पासवर्ड",
        "login_btn": "लॉग इन",
        // Feed
        "top_issues": "आपके क्षेत्र की प्रमुख समस्याएं",
        "btn_list": "सूची",
        "btn_map": "नक्शा",
        "map_overlay": "इंटरैक्टिव समस्या मानचित्र (अनुकरण)",
        // Report Form
        "submit_issue": "नई समस्या दर्ज करें",
        "submit_subtitle": "स्थानीय समस्याओं की रिपोर्ट करके समुदाय को बेहतर बनाने में हमारी मदद करें।",
        "issue_image": "समस्या की तस्वीर (अनिवार्य)",
        "dropzone_text": "खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें",
        "category_question": "आप किस प्रकार की नागरिक समस्या की रिपोर्ट कर रहे हैं?",
        "category_subtitle": "वह श्रेणी चुनें जो समस्या का सबसे अच्छा वर्णन करती है",
        "cat_pothole": "गड्ढा",
        "cat_garbage": "सड़क किनारे कचरा",
        "cat_streetlight": "टूटी स्ट्रीटलाइट",
        "cat_waterlogging": "जलभराव",
        "cat_flood": "बाढ़",
        "cat_dumping": "अवैध कचरा डंपिंग",
        "cat_parking": "अवैध पार्किंग",
        "cat_other": "अन्य",
        "urgency_level": "तत्कालता स्तर",
        "urgency_low": "कम",
        "urgency_medium": "मध्यम",
        "urgency_high": "उच्च",
        "description_label": "विवरण",
        "voice_typing": "वॉइस टाइपिंग",
        "location_label": "स्थान",
        "detect_btn": "पता लगाएं",
        "report_anonymously": "अनाम रूप से रिपोर्ट करें 🥷",
        "receive_whatsapp": "WhatsApp अपडेट प्राप्त करें 📲",
        "submit_report": "रिपोर्ट दर्ज करें",
        // Admin Dashboard
        "total_issues": "कुल समस्याएं",
        "high_priority": "उच्च प्राथमिकता",
        "resolved": "हल की गई",
        "daily_action_plan": "दैनिक कार्य योजना",
        "ai_grouping": "AI ग्रुपिंग सक्रिय",
        "issue_management": "समस्या प्रबंधन",
        "ml_enhanced": "ML उन्नत दृश्य",
        "all_areas": "सभी क्षेत्र",
        "all_categories": "सभी श्रेणियां",
        "th_id_date": "आईडी और तारीख",
        "th_issue_details": "समस्या विवरण",
        "th_insights": "अंतर्दृष्टि (ML)",
        "th_status": "स्थिति",
        "th_action": "कार्रवाई",
        // Profile
        "citizen_user": "नागरिक उपयोगकर्ता",
        "profile_subtitle": "शामिल हुए: जनवरी 2024 • सक्रिय सदस्य",
        "issues_reported": "दर्ज की गई समस्याएं",
        "issues_resolved": "हल की गई समस्याएं",
        "upvotes_given": "दिए गए अपवोट",
        "my_reports": "मेरी सक्रिय और पूर्ण रिपोर्टें",
        // About
        "about_title": "CivicConnect के बारे में",
        "about_subtitle": "नागरिकों को बेहतर समुदाय बनाने के लिए सशक्त बनाना।",
        "about_p1": "CivicConnect एक आधुनिक, समुदाय-संचालित प्लेटफ़ॉर्म है जो नागरिकों और स्थानीय प्राधिकरणों के बीच की खाई को पाटने के लिए बनाया गया है। हमारा मिशन निवासियों को बुनियादी ढांचे की क्षति, स्वच्छता की समस्याओं और सुरक्षा खतरों जैसी स्थानीय समस्याओं की रिपोर्ट करने का एक सुलभ और पारदर्शी तरीका प्रदान करना है।",
        "about_p2": "प्रौद्योगिकी और सामुदायिक भागीदारी का लाभ उठाकर, हम समाधान प्रक्रिया को सुव्यवस्थित करने और एक सहयोगी वातावरण बनाने का लक्ष्य रखते हैं जहां हर कोई हमारे शहर की बेहतरी में योगदान दे सके।",
        "key_features": "प्रमुख विशेषताएं",
        "feature_1": "छवि और स्थान समर्थन के साथ वास्तविक समय की समस्या रिपोर्टिंग",
        "feature_2": "महत्वपूर्ण समस्याओं को प्राथमिकता देने के लिए सामुदायिक अपवोटिंग प्रणाली",
        "feature_3": "प्रशासकों के लिए ML-उन्नत डैशबोर्ड",
        "feature_4": "समस्या समाधान स्थिति की पारदर्शी ट्रैकिंग",
        "vision_title": "हमारा विज़न और इतिहास",
        "vision_p1": "2024 में स्थापित, CivicConnect एक सरल विश्वास के साथ शुरू हुआ: कि रोज़मर्रा के नागरिक अपने स्थानीय परिवेश के सबसे अच्छे पर्यवेक्षक हैं। हमने महसूस किया कि जबकि बहुत से लोग अपने दैनिक आवागमन पर टूटी स्ट्रीटलाइट्स, गड्ढों और स्वच्छता की समस्याओं को देखते हैं, इन मुद्दों की रिपोर्ट करने में शामिल परेशानी अक्सर कार्रवाई को हतोत्साहित करती है।",
        "vision_p2": "हम एक ऐसे भविष्य की कल्पना करते हैं जहां शहर उत्तरदायी और लचीले हों। आधुनिक वेब विकास और मशीन लर्निंग को लागू करके, हम स्थानीय प्रशासन की लालफीताशाही को कम कर रहे हैं। हमारा प्लेटफ़ॉर्म न केवल सही नगरपालिका विभागों को समस्याएं रूट करता है बल्कि समाधान समयसीमा पर सार्वजनिक पारदर्शिता भी प्रदान करता है।",
        "vision_p3": "आने वाले वर्षों में, हम अपने एकीकरण को सीधे शहर की बैकएंड सेवाओं में विस्तारित करने की योजना बना रहे हैं। हम खुले डेटा, खुले संवाद और एक जुड़े हुए समुदाय की शक्ति में विश्वास करते हैं।",
        "our_team": "हमारी टीम",
        "role_founder": "संस्थापक और सीईओ",
        "role_developer": "प्रमुख डेवलपर",
        "role_community": "सामुदायिक प्रबंधक",
        // Contact
        "contact_title": "CivicConnect से संपर्क करें",
        "contact_subtitle": "संचालन मुख्यालय से सुरक्षित रूप से संपर्क करें या आपातकालीन बुनियादी ढांचा प्रतिक्रिया शुरू करें।",
        "emergency_hotlines": "आपातकालीन हेल्पलाइन",
        "official_directories": "आधिकारिक निर्देशिकाएं",
        "central_hq": "केंद्रीय मुख्यालय कार्यालय",
        "sla_title": "सेवा स्तर वितरण (SLA) मैट्रिक्स",
        "sla_24h": "24 घंटे",
        "sla_24h_desc": "उच्च तत्कालता प्रतिक्रिया",
        "sla_3d": "3 दिन",
        "sla_3d_desc": "मानक बैच SLA",
        "sla_15d": "15 दिन",
        "sla_15d_desc": "स्वचालित अधिकतम उपेक्षा सीमा",
        // Works
        "works_title": "हमारे कार्य और प्रभाव",
        "works_subtitle": "जानें कि CivicConnect ने जन-सहभागिता से स्थानीय सामुदायिक बुनियादी ढांचे को कैसे बदला है।",
        // Signup & Google Auth
        "signup_btn": "साइन अप",
        "signup_title": "खाता बनाएं",
        "signup_subtitle": "आज ही CivicConnect समुदाय से जुड़ें",
        "signup_fullname_label": "पूरा नाम",
        "signup_email_label": "ईमेल पता",
        "signup_username_label": "उपयोगकर्ता नाम चुनें",
        "signup_password_label": "पासवर्ड",
        "signup_confirm_label": "पासवर्ड पुष्टि करें",
        "login_gmail": "Google से जारी रखें",
        "signup_gmail": "Google से साइन अप करें",
        "or_divider": "या",
        "no_account": "खाता नहीं है?",
        "signup_link": "यहां साइन अप करें",
        "have_account": "पहले से खाता है?",
        "login_link": "यहां लॉगिन करें",
        "login_welcome": "वापसी पर स्वागत",
        // Account Settings
        "account_settings": "खाता सेटिंग्स",
        "admin_settings": "प्रशासक खाता सेटिंग्स",
        "change_password": "पासवर्ड बदलें",
        "current_password": "वर्तमान पासवर्ड",
        "new_password": "नया पासवर्ड",
        "confirm_new_password": "नया पासवर्ड पुष्टि करें",
        "save_password": "पासवर्ड सहेजें",
        "change_email": "ईमेल बदलें",
        "current_email": "वर्तमान ईमेल",
        "new_email": "नया ईमेल",
        "save_email": "ईमेल सहेजें",
        "change_phone": "फ़ोन नंबर बदलें",
        "current_phone": "वर्तमान फ़ोन",
        "new_phone": "नया फ़ोन नंबर",
        "save_phone": "फ़ोन सहेजें"
    }
};

// --- Global State ---
let issuesData = [];
let currentUser = null;
let intendedRoute = null;

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initDrawer();
    initLanguageToggle();
    initFeedControls();
    initReportForm();
    initAuth();
    initSignup();
    initAuthTabs();
    initGmailAuth();
    initAccountSettings();
    
    // Fetch data for public feed at launch
    fetchIssues();
});

// --- Drawer Logic ---
function initDrawer() {
    const accountDrawer = document.getElementById('account-drawer');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const drawerLinks = document.querySelectorAll('.drawer-links .nav-link');

    if (menuToggleBtn && accountDrawer) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            accountDrawer.classList.toggle('active');
        });
    }

    if (closeDrawerBtn && accountDrawer) {
        closeDrawerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            accountDrawer.classList.remove('active');
        });
    }

    // Close when a nav link is clicked
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(accountDrawer) accountDrawer.classList.remove('active');
        });
    });
}

function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            langBtns.forEach(b => {
                b.classList.remove('active');
                b.style.opacity = '0.5';
            });
            const clicked = e.target;
            clicked.classList.add('active');
            clicked.style.opacity = '1';
            
            const lang = clicked.getAttribute('data-lang');
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if(translations[lang] && translations[lang][key]) {
                    el.innerText = translations[lang][key];
                }
            });
        });
    });
}

async function fetchIssues() {
    try {
        const response = await fetch(`${API_BASE}/issues`);
        issuesData = await response.json();
        renderFeed();
        renderAdminTable();
        updateAdminStats();
        renderActionEngine();
        renderUserIssues();
        renderResolvedWorks();
        fetchComplaintRequests();
    } catch (error) {
        console.error("Failed to fetch issues:", error);
    }
}

// --- Auth Logic ---
function initAuth() {
    const loginForm = document.getElementById('login-form');
    const authToggle = document.getElementById('nav-auth-toggle');
    const authIcon = document.getElementById('nav-auth-icon');
    const authText = document.getElementById('nav-auth-text');
    const usernameDisplay = document.getElementById('nav-username');

    // Check session
    const storedUser = sessionStorage.getItem('civicUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        updateUIForUser();
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userVal = document.getElementById('login-username').value;
            const passVal = document.getElementById('login-password').value;

            try {
                const res = await fetch(`${API_BASE}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userVal, password: passVal })
                });

                if (res.ok) {
                    const data = await res.json();
                    currentUser = data.user;
                    sessionStorage.setItem('civicUser', JSON.stringify(currentUser));
                    
                    updateUIForUser();
                    
                    // Route to intended route
                    const routeBack = intendedRoute || 'view-feed';
                    const linkTarget = document.querySelector(`.nav-link[data-target="${routeBack}"]`);
                    if(linkTarget) linkTarget.click();
                    intendedRoute = null; // Clear it
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            } catch (err) {
                console.error("Login Error", err);
                alert("Error connecting to server. Make sure the backend is running.");
            }
        });
    }

    if (authToggle) {
        authToggle.addEventListener('click', (e) => {
            if (currentUser) {
                // Logout action
                e.preventDefault();
                sessionStorage.removeItem('civicUser');
                currentUser = null;
                updateUIForUser();
                
                // Route to feed if on restricted view
                const activeView = document.querySelector('.view-section.active');
                if(activeView && ['view-admin', 'view-report', 'view-profile'].includes(activeView.id)) {
                    document.querySelector('.nav-link[data-target="view-feed"]').click();
                }
            }
        });
    }

    function updateUIForUser() {
        const authText = document.getElementById('nav-auth-text');
        const authIcon = document.getElementById('nav-auth-icon');
        const drawerUserInfo = document.getElementById('drawer-user-info');
        const usernameDisplay = document.getElementById('nav-username');
        
        // ensure renders trigger dynamically matching session updates
        if(typeof renderUserIssues === 'function') renderUserIssues();
        const drawerRole = document.getElementById('drawer-role');
        const drawerItemProfile = document.getElementById('drawer-item-profile');
        const drawerItemAdmin = document.getElementById('drawer-item-admin');
        const loginForm = document.getElementById('login-form');

        if (currentUser) {
            if(authText) authText.innerHTML = `Logout`;
            if(authIcon) authIcon.className = "fa-solid fa-sign-out-alt";
            
            if(drawerUserInfo) drawerUserInfo.style.display = 'flex';
            if(usernameDisplay) usernameDisplay.innerText = currentUser.username || 'Citizen User';
            if(drawerRole) drawerRole.innerText = currentUser.role === 'admin' ? 'Administrator' : 'Citizen';
            
            if(drawerItemProfile) drawerItemProfile.style.display = 'block';
            if(drawerItemAdmin) drawerItemAdmin.style.display = currentUser.role === 'admin' ? 'block' : 'none';
        } else {
            if(authText) authText.innerHTML = `Login`;
            if(authIcon) authIcon.className = "fa-solid fa-right-to-bracket";
            
            if(drawerUserInfo) drawerUserInfo.style.display = 'none';
            if(drawerItemProfile) drawerItemProfile.style.display = 'none';
            if(drawerItemAdmin) drawerItemAdmin.style.display = 'none';

            if (loginForm) loginForm.reset();
        }
    }
}

// --- Signup Logic ---
function initSignup() {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullname = document.getElementById('signup-fullname').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;

        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, username, password })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                currentUser = data.user;
                sessionStorage.setItem('civicUser', JSON.stringify(currentUser));
                alert('🎉 Account created successfully! Welcome, ' + data.user.fullname);
                
                // Update UI
                if (typeof updateUIForUser === 'function') updateUIForUser();
                // Use the global one inside initAuth's scope
                document.getElementById('nav-auth-text').innerHTML = 'Logout';
                document.getElementById('nav-auth-icon').className = 'fa-solid fa-sign-out-alt';
                document.getElementById('drawer-user-info').style.display = 'flex';
                document.getElementById('nav-username').innerText = data.user.username;
                document.getElementById('drawer-role').innerText = 'Citizen';
                document.getElementById('drawer-item-profile').style.display = 'block';
                document.getElementById('drawer-item-admin').style.display = 'none';

                // Navigate to feed
                const routeBack = intendedRoute || 'view-feed';
                const linkTarget = document.querySelector(`.nav-link[data-target="${routeBack}"]`);
                if (linkTarget) linkTarget.click();
                intendedRoute = null;
            } else {
                alert(data.error || 'Signup failed. Please try again.');
            }
        } catch (err) {
            console.error('Signup Error', err);
            alert('Error connecting to server. Make sure the backend is running.');
        }
    });
}

// --- Auth Tab Switching ---
function initAuthTabs() {
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const loginPanel = document.getElementById('auth-login-panel');
    const signupPanel = document.getElementById('auth-signup-panel');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    function showLogin() {
        if (loginPanel) loginPanel.style.display = 'block';
        if (signupPanel) signupPanel.style.display = 'none';
        if (tabLogin) { tabLogin.style.background = 'var(--color-primary)'; tabLogin.style.color = '#fff'; tabLogin.classList.add('active'); }
        if (tabSignup) { tabSignup.style.background = 'rgba(255,255,255,0.05)'; tabSignup.style.color = 'var(--text-muted)'; tabSignup.classList.remove('active'); }
    }

    function showSignup() {
        if (loginPanel) loginPanel.style.display = 'none';
        if (signupPanel) signupPanel.style.display = 'block';
        if (tabSignup) { tabSignup.style.background = 'var(--color-primary)'; tabSignup.style.color = '#fff'; tabSignup.classList.add('active'); }
        if (tabLogin) { tabLogin.style.background = 'rgba(255,255,255,0.05)'; tabLogin.style.color = 'var(--text-muted)'; tabLogin.classList.remove('active'); }
    }

    if (tabLogin) tabLogin.addEventListener('click', showLogin);
    if (tabSignup) tabSignup.addEventListener('click', showSignup);
    if (switchToSignup) switchToSignup.addEventListener('click', (e) => { e.preventDefault(); showSignup(); });
    if (switchToLogin) switchToLogin.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });
}

// --- Gmail / Google Auth ---
function initGmailAuth() {
    const gmailLoginBtn = document.getElementById('gmail-login-btn');
    const gmailSignupBtn = document.getElementById('gmail-signup-btn');

    async function handleGoogleAuth() {
        // Simulated Google OAuth popup prompt
        const email = prompt('Enter your Gmail address:');
        if (!email || !email.includes('@')) {
            if (email !== null) alert('Please enter a valid email address.');
            return;
        }
        const fullname = prompt('Enter your full name:') || email.split('@')[0];

        try {
            const res = await fetch(`${API_BASE}/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, fullname })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                currentUser = data.user;
                sessionStorage.setItem('civicUser', JSON.stringify(currentUser));

                // Update UI
                document.getElementById('nav-auth-text').innerHTML = 'Logout';
                document.getElementById('nav-auth-icon').className = 'fa-solid fa-sign-out-alt';
                document.getElementById('drawer-user-info').style.display = 'flex';
                document.getElementById('nav-username').innerText = data.user.fullname || data.user.username;
                document.getElementById('drawer-role').innerText = data.user.role === 'admin' ? 'Administrator' : 'Citizen';
                document.getElementById('drawer-item-profile').style.display = 'block';
                document.getElementById('drawer-item-admin').style.display = data.user.role === 'admin' ? 'block' : 'none';

                if (typeof renderUserIssues === 'function') renderUserIssues();

                // Navigate
                const routeBack = intendedRoute || 'view-feed';
                const linkTarget = document.querySelector(`.nav-link[data-target="${routeBack}"]`);
                if (linkTarget) linkTarget.click();
                intendedRoute = null;

                alert('✅ Signed in with Google as ' + (data.user.fullname || data.user.username));
            } else {
                alert(data.error || 'Google sign-in failed.');
            }
        } catch (err) {
            console.error('Google Auth Error', err);
            alert('Error connecting to server.');
        }
    }

    if (gmailLoginBtn) gmailLoginBtn.addEventListener('click', handleGoogleAuth);
    if (gmailSignupBtn) gmailSignupBtn.addEventListener('click', handleGoogleAuth);
}

// --- Account Settings (Password / Email / Phone) ---
function initAccountSettings() {
    // Helper to populate current email/phone fields when profile loads
    function populateCurrentFields() {
        if (!currentUser) return;
        const emailFields = ['settings-current-email', 'admin-current-email'];
        const phoneFields = ['settings-current-phone', 'admin-current-phone'];
        emailFields.forEach(id => { const el = document.getElementById(id); if (el) el.value = currentUser.email || ''; });
        phoneFields.forEach(id => { const el = document.getElementById(id); if (el) el.value = currentUser.phone || 'Not set'; });
    }

    // Call on init & observe profile view activation
    populateCurrentFields();
    const observer = new MutationObserver(() => populateCurrentFields());
    const profileSection = document.getElementById('view-profile');
    const adminSection = document.getElementById('view-admin');
    if (profileSection) observer.observe(profileSection, { attributes: true, attributeFilter: ['class'] });
    if (adminSection) observer.observe(adminSection, { attributes: true, attributeFilter: ['class'] });

    // --- Change Password (both user & admin forms) ---
    ['change-password-form', 'admin-change-password-form'].forEach(formId => {
        const form = document.getElementById(formId);
        if (!form) return;
        const prefix = formId.startsWith('admin') ? 'admin-' : 'settings-';
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const curr = document.getElementById(prefix + 'current-password').value;
            const newP = document.getElementById(prefix + 'new-password').value;
            const conf = document.getElementById(prefix + 'confirm-password').value;

            if (newP !== conf) { alert('❌ New passwords do not match!'); return; }
            if (!currentUser) { alert('Please log in first.'); return; }

            try {
                const res = await fetch(`${API_BASE}/user/password`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: currentUser.username, currentPassword: curr, newPassword: newP })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    alert('✅ ' + data.message);
                    form.reset();
                } else {
                    alert('❌ ' + (data.error || 'Failed to update password'));
                }
            } catch (err) { alert('Error connecting to server.'); }
        });
    });

    // --- Change Email (both user & admin forms) ---
    ['change-email-form', 'admin-change-email-form'].forEach(formId => {
        const form = document.getElementById(formId);
        if (!form) return;
        const prefix = formId.startsWith('admin') ? 'admin-' : 'settings-';
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newEmail = document.getElementById(prefix + 'new-email').value.trim();
            if (!currentUser) { alert('Please log in first.'); return; }

            try {
                const res = await fetch(`${API_BASE}/user/email`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: currentUser.username, newEmail })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    currentUser.email = data.email;
                    sessionStorage.setItem('civicUser', JSON.stringify(currentUser));
                    alert('✅ ' + data.message);
                    form.reset();
                    populateCurrentFields();
                } else {
                    alert('❌ ' + (data.error || 'Failed to update email'));
                }
            } catch (err) { alert('Error connecting to server.'); }
        });
    });

    // --- Change Phone (both user & admin forms) ---
    ['change-phone-form', 'admin-change-phone-form'].forEach(formId => {
        const form = document.getElementById(formId);
        if (!form) return;
        const prefix = formId.startsWith('admin') ? 'admin-' : 'settings-';
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newPhone = document.getElementById(prefix + 'new-phone').value.trim();
            if (!currentUser) { alert('Please log in first.'); return; }

            try {
                const res = await fetch(`${API_BASE}/user/phone`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: currentUser.username, newPhone })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    currentUser.phone = data.phone;
                    sessionStorage.setItem('civicUser', JSON.stringify(currentUser));
                    alert('✅ ' + data.message);
                    form.reset();
                    populateCurrentFields();
                } else {
                    alert('❌ ' + (data.error || 'Failed to update phone'));
                }
            } catch (err) { alert('Error connecting to server.'); }
        });
    });
}

// --- Navigation Logic ---
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if(!targetId) return; // Prevent Default happens via anchor anyway
            e.preventDefault();

            // Check permissions
            if (targetId === 'view-profile') {
                if (!currentUser) {
                    intendedRoute = targetId;
                    const drawer = document.getElementById('account-drawer');
                    if(drawer) drawer.classList.add('active'); // Open drawer to show login
                    return;
                }
            } else if (targetId === 'view-admin') {
                if (!currentUser || currentUser.role !== 'admin') {
                    intendedRoute = targetId;
                    switchToSection('view-login', navLinks, sections, pageTitle, "Admin Login Required");
                    return;
                }
            }

            switchToSection(targetId, navLinks, sections, pageTitle, link.querySelector('span').innerText);
        });
    });
}

function switchToSection(targetId, navLinks, sections, pageTitle, titleText) {
    // Update links
    navLinks.forEach(l => l.classList.remove('active'));
    const targetLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if(targetLink) targetLink.classList.add('active');

    // Update sections
    sections.forEach(s => s.classList.remove('active'));
    const targetSection = document.getElementById(targetId);
    if(targetSection) targetSection.classList.add('active');

    // Update title
    if (pageTitle) pageTitle.innerText = titleText;
}

// --- Feed Render ---
function renderFeed() {
    const feedContainer = document.getElementById('feed-list');
    feedContainer.innerHTML = '';

    issuesData.forEach(issue => {
        const card = document.createElement('div');
        card.className = 'issue-card glass-panel';
        
        let statusLabel = issue.status === 'progress' ? 'In Progress' : issue.status;
        
        let escalationTag = '';
        if (issue.status === 'pending') {
            const dateObj = new Date(issue.date);
            const today = new Date();
            // Force random offsets for mockup representation if today matches
            const diffDays = Math.floor((today - dateObj) / (1000 * 60 * 60 * 24)) + (issue.id === 'ISS-002' ? 8 : (issue.id === 'ISS-001' ? 16 : 4));
            
            if (diffDays > 15) escalationTag = '<span class="tag tag-neglected"><i class="fa-solid fa-triangle-exclamation"></i> Neglected (15+ days)</span>';
            else if (diffDays > 7) escalationTag = '<span class="tag tag-escalated"><i class="fa-solid fa-fire"></i> Escalated (7+ days)</span>';
            else if (diffDays > 3) escalationTag = '<span class="tag tag-reminder"><i class="fa-solid fa-clock"></i> Reminder Sent</span>';
        }
        
        let falseClosureBlock = '';
        if (issue.status === 'resolved' && !issue.falseResolution) {
            falseClosureBlock = `
                <div style="width: 100%; border-top: 1px dashed var(--border-glass); margin-top: 12px; padding-top: 12px;">
                    <div style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 8px;">Resolution Verified?</div>
                    <button class="btn-secondary reopen-btn" data-id="${issue.id}" style="font-size: 0.8rem; color: #ef4444; border-color: #ef4444; padding: 4px 8px;">No, Issue Persists</button>
                    <button class="btn-secondary" style="font-size: 0.8rem; color: #10b981; border-color: #10b981; padding: 4px 8px;">Yes, Verified</button>
                </div>
            `;
        }

        let urgencyTag = issue.urgency ? `<span class="tag" style="background: rgba(255,255,255,0.1);">${issue.urgency} Urgency</span>` : '';

        // Build existing comments HTML
        const commentsArr = issue.comments || [];
        let commentsListHTML = commentsArr.map(c => {
            const timeAgo = getTimeAgo(c.date);
            const initial = (c.user || 'A').charAt(0).toUpperCase();
            return `
                <div class="comment-item">
                    <div class="comment-avatar">${initial}</div>
                    <div class="comment-body">
                        <div class="comment-meta">
                            <strong>${c.user}</strong>
                            <span>${timeAgo}</span>
                        </div>
                        <p class="comment-text">${c.text}</p>
                    </div>
                </div>
            `;
        }).join('');

        card.innerHTML = `
            <div class="card-header" style="flex-wrap: wrap; gap: 8px;">
                <span class="status-badge ${issue.status}">${statusLabel}</span>
                ${urgencyTag}
                ${escalationTag}
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: auto;">${issue.date}</span>
            </div>
            <img src="${issue.image}" alt="Issue" class="card-image">
            <div class="card-content">
                <div style="font-size: 0.8rem; color: var(--color-primary); margin-bottom: 8px;"><i class="fa-solid fa-building-columns"></i> Routed to: ${issue.authority || 'Local Department'}</div>
                <h3>${issue.title}</h3>
                <p>${issue.desc}</p>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;"><i class="fa-solid fa-user-pen"></i> Reported by: ${issue.reportedBy || 'Citizen'}</div>
            </div>
            <div class="card-footer" style="flex-wrap: wrap;">
                <div class="location"><i class="fa-solid fa-location-dot"></i> ${issue.location}</div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-icon" style="color: var(--text-main);" onclick="window.open('https://wa.me/?text=Check out this civic issue: ${issue.title}', '_blank')"><i class="fa-brands fa-whatsapp"></i></button>
                    <button class="upvote-btn ${issue.isVoted ? 'voted' : ''}" data-id="${issue.id}">
                        <i class="fa-solid fa-circle-up"></i> 
                        <span>${issue.upvotes}</span>
                    </button>
                    <button class="comment-toggle-btn" data-id="${issue.id}" title="Comments">
                        <i class="fa-solid fa-comment"></i>
                        <span>${commentsArr.length}</span>
                    </button>
                </div>
                ${falseClosureBlock}
            </div>
            <!-- Comments Section -->
            <div class="comments-section" id="comments-${issue.id}" style="display: none;">
                <div class="comments-divider"></div>
                <div class="comments-header">
                    <i class="fa-solid fa-comments"></i>
                    <span>Comments (${commentsArr.length})</span>
                </div>
                <div class="comments-list" id="comments-list-${issue.id}">
                    ${commentsListHTML || '<p class="comments-empty"><i class="fa-regular fa-comment-dots"></i> No comments yet. Be the first!</p>'}
                </div>
                <form class="comment-form" data-issue-id="${issue.id}">
                    <div class="comment-input-wrap">
                        <input type="text" class="comment-input" placeholder="Write a comment..." required>
                        <button type="submit" class="comment-send-btn" title="Send">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>
        `;
        feedContainer.appendChild(card);
    });

    // Add upvote listeners
    document.querySelectorAll('.upvote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            toggleUpvote(id);
        });
    });

    // Add Reopen Listeners
    document.querySelectorAll('.reopen-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            try {
                const response = await fetch(`${API_BASE}/issues/${id}/reopen`, { method: 'PATCH' });
                if (response.ok) {
                    alert("Issue has been successfully flagged and reopened!");
                    fetchIssues(); // Refresh feed completely
                }
            } catch (err) {
                console.error("Failed to reopen issue", err);
            }
        });
    });

    // Comment toggle listeners
    document.querySelectorAll('.comment-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const section = document.getElementById(`comments-${id}`);
            if (section) {
                const isOpen = section.style.display !== 'none';
                section.style.display = isOpen ? 'none' : 'block';
                btn.classList.toggle('active', !isOpen);
            }
        });
    });

    // Comment form submit listeners
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const issueId = form.getAttribute('data-issue-id');
            const input = form.querySelector('.comment-input');
            const text = input.value.trim();
            if (!text) return;

            const userName = currentUser ? (currentUser.fullname || currentUser.username) : 'Anonymous';

            try {
                const res = await fetch(`${API_BASE}/issues/${issueId}/comments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user: userName, text })
                });
                if (res.ok) {
                    const newComment = await res.json();
                    // Update local data
                    const issue = issuesData.find(i => i.id === issueId);
                    if (issue) {
                        if (!issue.comments) issue.comments = [];
                        issue.comments.push(newComment);
                    }
                    // Append comment to DOM without full re-render
                    const listEl = document.getElementById(`comments-list-${issueId}`);
                    const emptyMsg = listEl.querySelector('.comments-empty');
                    if (emptyMsg) emptyMsg.remove();

                    const initial = (newComment.user || 'A').charAt(0).toUpperCase();
                    const commentEl = document.createElement('div');
                    commentEl.className = 'comment-item comment-new';
                    commentEl.innerHTML = `
                        <div class="comment-avatar">${initial}</div>
                        <div class="comment-body">
                            <div class="comment-meta">
                                <strong>${newComment.user}</strong>
                                <span>Just now</span>
                            </div>
                            <p class="comment-text">${newComment.text}</p>
                        </div>
                    `;
                    listEl.appendChild(commentEl);
                    listEl.scrollTop = listEl.scrollHeight;

                    // Update count in toggle button
                    const toggleBtn = document.querySelector(`.comment-toggle-btn[data-id="${issueId}"] span`);
                    if (toggleBtn) toggleBtn.textContent = issue.comments.length;
                    const headerSpan = document.querySelector(`#comments-${issueId} .comments-header span`);
                    if (headerSpan) headerSpan.textContent = `Comments (${issue.comments.length})`;

                    input.value = '';
                }
            } catch (err) {
                console.error('Error posting comment:', err);
            }
        });
    });
}

// Helper: time ago
function getTimeAgo(dateStr) {
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now - d;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
}

async function toggleUpvote(id) {
    // Optimistic UI update could be done here, but let's wait for server response
    try {
        const response = await fetch(`${API_BASE}/issues/${id}/upvote`, {
            method: 'PATCH'
        });
        if (response.ok) {
            const updatedIssue = await response.json();
            // Update local state issue
            const idx = issuesData.findIndex(i => i.id === id);
            if(idx !== -1) {
                issuesData[idx] = updatedIssue;
            }
            renderFeed(); // Re-render to update UI
        }
    } catch(err) {
        console.error("Error upvoting:", err);
    }
}

// --- Feed List/Map Toggles ---
function initFeedControls() {
    const btnList = document.getElementById('btn-list-view');
    const btnMap = document.getElementById('btn-map-view');
    const feedList = document.getElementById('feed-list');
    const feedMap = document.getElementById('feed-map');

    btnList.addEventListener('click', () => {
        btnList.classList.add('active');
        btnMap.classList.remove('active');
        feedList.style.display = 'grid';
        feedMap.style.display = 'none';
    });

    btnMap.addEventListener('click', () => {
        btnMap.classList.add('active');
        btnList.classList.remove('active');
        feedList.style.display = 'none';
        feedMap.style.display = 'block';
    });
}

// --- Report Form Logic ---
function initReportForm() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('issue-image');
    const imgPreview = document.getElementById('image-preview');
    const btnDetect = document.getElementById('btn-detect-location');
    const locInput = document.getElementById('issue-location');
    const form = document.getElementById('report-form');

    // Category Grid Logic
    const categoryCards = document.querySelectorAll('.category-card');
    const categoryInput = document.getElementById('issue-category');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            categoryInput.value = card.getAttribute('data-value');
        });
    });

    // Drag and drop mocks
    dropzone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgPreview.src = e.target.result;
                imgPreview.style.display = 'block';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    // Real Location Detection
    btnDetect.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        locInput.value = "Detecting using GPS...";
        btnDetect.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            try {
                // Reverse geocode with OpenStreetMap Nominatim
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
                if (response.ok) {
                    const data = await response.json();
                    const address = data.display_name || data.displayName || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                    locInput.value = address;
                } else {
                    locInput.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                }
            } catch (err) {
                console.error("Geocoding failed:", err);
                locInput.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
            } finally {
                btnDetect.innerHTML = '<i class="fa-solid fa-crosshairs"></i> <span data-i18n="detect_btn">Detect</span>';
            }
        }, (error) => {
            console.error("Geolocation Error:", error);
            alert("Unable to retrieve your location. Please check browser permissions.");
            locInput.value = "";
            btnDetect.innerHTML = '<i class="fa-solid fa-crosshairs"></i> <span data-i18n="detect_btn">Detect</span>';
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    });

    // Voice Input Setup
    const voiceBtn = document.getElementById('voice-input-btn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            if (!('webkitSpeechRecognition' in window)) {
                alert("Speech recognition not supported in this browser.");
                return;
            }
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-IN'; // Standard Indian context
            voiceBtn.innerHTML = '<i class="fa-solid fa-microphone-lines fa-fade"></i> Listening...';
            
            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                document.getElementById('issue-desc').value += " " + text;
                voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Voice Typing';
            };
            recognition.onerror = (e) => {
                console.error("Speech Recog Error", e);
                voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Voice Typing';
            };
            recognition.onend = () => {
                voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Voice Typing';
            }
            recognition.start();
        });
    }

    // Urgency Card logic
    const urgencyCards = document.querySelectorAll('.urgency-card');
    urgencyCards.forEach(card => {
        card.addEventListener('click', (e) => {
            urgencyCards.forEach(c => {
                c.classList.remove('active');
                c.style.border = '1px solid var(--border-glass)';
                c.style.background = 'transparent';
            });
            const clicked = e.currentTarget;
            clicked.classList.add('active');
            clicked.style.border = '2px solid #3B82F6';
            clicked.style.background = 'rgba(59, 130, 246, 0.1)';
        });
    });

    // Handle Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            alert("login first before submitting issue");
            const drawer = document.getElementById('account-drawer');
            if(drawer) drawer.classList.add('active');
            return;
        }
        
        const desc = document.getElementById('issue-desc').value;
        const cat = document.getElementById('issue-category').value;
        let loc = locInput.value;
        
        const isAnon = document.getElementById('issue-anonymous').checked;
        const wantWhatsApp = document.getElementById('issue-whatsapp').checked;
        
        let wardStr = "Ward 9";
        if(loc.includes("Lat")) wardStr = "Sector 62 (Detected)";

        const urgencyEl = document.querySelector('input[name="issueUrgency"]:checked');
        const urgencySelected = urgencyEl ? urgencyEl.value : 'Medium';

        // Create payload to send to backend
        const payload = {
            desc: desc,
            category: cat,
            urgency: urgencySelected,
            location: loc || "Unknown Location",
            ward: wardStr,
            isAnonymous: isAnon,
            reportedBy: currentUser.username,
            image: imgPreview.src || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80"
        };

        try {
            const response = await fetch(`${API_BASE}/issues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if(response.ok) {
                // Reset form
                form.reset();
                imgPreview.style.display = 'none';
                imgPreview.src = '';
                
                // Show success — complaint is pending admin approval
                alert("✅ Complaint submitted successfully!\n\nYour complaint is now pending admin approval. It will appear on the public feed once reviewed and approved by the administrator.");
                document.querySelector('.nav-link[data-target="view-feed"]').click();
                
                // Refresh complaint requests for admin
                fetchComplaintRequests();
            }
        } catch(err) {
            console.error("Failed to submit issue", err);
            alert("Failed to connect to the backend. Please ensure the server is running on port 5501.");
        }
    });
}

// --- Admin Dashboard Logic ---
function renderAdminTable() {
    const tbody = document.getElementById('admin-table-body');
    tbody.innerHTML = '';

    issuesData.forEach(issue => {
        const tr = document.createElement('tr');
        
        // Tags representation
        let priorityTag = '';
        if(issue.mlPriority === 'high') priorityTag = '<span class="tag tag-p-high">High Priority</span>';
        else if(issue.mlPriority === 'med') priorityTag = '<span class="tag tag-p-med">Medium Priority</span>';
        else priorityTag = '<span class="tag" style="background: rgba(16,185,129,0.1); color:#10B981; border: 1px solid rgba(16,185,129,0.3)">Low Priority</span>';

        let dupTag = issue.mlDuplicate ? '<span class="tag tag-duplicate">Possible Duplicate</span>' : '';
        
        let escalationTag = '';
        if (issue.status === 'pending') {
            const dateObj = new Date(issue.date);
            const today = new Date();
            const diffDays = Math.floor((today - dateObj) / (1000 * 60 * 60 * 24)) + (issue.id === 'ISS-002' ? 8 : (issue.id === 'ISS-001' ? 16 : 4));
            if (diffDays > 15) escalationTag = '<span class="tag tag-neglected">Neglected (15+ days)</span>';
            else if (diffDays > 7) escalationTag = '<span class="tag tag-escalated">Escalated (7+ days)</span>';
        }

        tr.innerHTML = `
            <td>
                <strong>${issue.id}</strong><br>
                <span style="font-size: 0.8rem; color: var(--text-muted);">${issue.date}</span>
                <br><span style="font-size: 0.75rem; color: var(--color-primary);">${issue.authority || ''}</span>
            </td>
            <td>
                <strong>${issue.title}</strong><br>
                <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${issue.location} <br> ${issue.ward || ''}</span>
            </td>
            <td>
                ${priorityTag}<br>
                ${dupTag}<br>
                ${escalationTag}
            </td>
            <td>
                <select class="status-select ${issue.status}" data-id="${issue.id}">
                    <option value="pending" ${issue.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="progress" ${issue.status === 'progress' ? 'selected' : ''}>In Progress</option>
                    <option value="resolved" ${issue.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                </select>
            </td>
            <td>
                <button class="btn-icon" title="View Details"><i class="fa-solid fa-eye"></i></button>
                <button class="btn-icon" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Add listeners to selects
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
            const id = e.target.getAttribute('data-id');
            const newStatus = e.target.value;

            try {
                const response = await fetch(`${API_BASE}/issues/${id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });

                if(response.ok) {
                    const updatedIssue = await response.json();
                    
                    e.target.className = `status-select ${newStatus}`;
                    
                    const idx = issuesData.findIndex(i => i.id === id);
                    if (idx !== -1) issuesData[idx] = updatedIssue;
                    
                    renderFeed();
                    updateAdminStats();
                }
            } catch(err) {
                console.error("Failed to update status", err);
                // Revert select on error
                const issue = issuesData.find(i => i.id === id);
                if(issue) e.target.value = issue.status;
            }
        });
    });
}

function updateAdminStats() {
    const total = issuesData.length;
    const high = issuesData.filter(i => i.mlPriority === 'high').length;
    const resolved = issuesData.filter(i => i.status === 'resolved').length;

    document.getElementById('stat-total').innerText = total;
    document.getElementById('stat-high').innerText = high;
    document.getElementById('stat-resolved').innerText = resolved;
}

// --- Complaint Requests (Pending Approval) ---
async function fetchComplaintRequests() {
    try {
        const res = await fetch(`${API_BASE}/issues/pending-approval`);
        const pendingIssues = await res.json();
        renderComplaintRequests(pendingIssues);
    } catch (err) {
        console.error('Failed to fetch complaint requests:', err);
    }
}

function renderComplaintRequests(pendingIssues) {
    const container = document.getElementById('complaint-requests-list');
    const countBadge = document.getElementById('pending-approval-count');
    if (!container) return;

    if (countBadge) countBadge.textContent = pendingIssues.length;

    if (pendingIssues.length === 0) {
        container.innerHTML = `
            <p style="color: var(--text-muted); text-align: center; padding: 24px 0;">
                <i class="fa-solid fa-check-circle" style="color: #10B981; font-size: 1.5rem; display: block; margin-bottom: 8px;"></i>
                No pending complaint requests. All clear!
            </p>`;
        return;
    }

    container.innerHTML = '';

    pendingIssues.forEach(issue => {
        const card = document.createElement('div');
        card.style.cssText = 'background: rgba(245,158,11,0.04); border: 1px solid rgba(245,158,11,0.15); border-radius: 10px; padding: 16px; display: flex; gap: 16px; align-items: flex-start; transition: all 0.3s ease;';

        const imgSrc = issue.image || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80';

        card.innerHTML = `
            <img src="${imgSrc}" alt="Issue" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; flex-shrink: 0;">
            <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                    <span style="font-weight: 600; font-size: 0.95rem; color: var(--text-main);">${issue.title || 'New ' + issue.category + ' Issue'}</span>
                    <span style="font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; background: rgba(245,158,11,0.15); color: #F59E0B; font-weight: 600;">${issue.category || 'Other'}</span>
                    <span style="font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; background: rgba(139,92,246,0.15); color: #8B5CF6; font-weight: 600;">${issue.urgency || 'Medium'} Urgency</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 4px 0 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${issue.desc || 'No description provided.'}</p>
                <div style="display: flex; gap: 16px; font-size: 0.75rem; color: var(--text-muted); flex-wrap: wrap;">
                    <span><i class="fa-solid fa-location-dot" style="color: var(--color-primary);"></i> ${issue.location}</span>
                    <span><i class="fa-solid fa-user-pen"></i> ${issue.reportedBy || 'Citizen'}</span>
                    <span><i class="fa-solid fa-calendar"></i> ${issue.date}</span>
                    <span><i class="fa-solid fa-building-columns"></i> ${issue.authority || ''}</span>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px; flex-shrink: 0;">
                <button class="approve-complaint-btn btn-primary" data-id="${issue.id}" style="padding: 8px 16px; font-size: 0.8rem; border-radius: 6px; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
                    <i class="fa-solid fa-check"></i> Approve
                </button>
                <button class="reject-complaint-btn" data-id="${issue.id}" style="padding: 8px 16px; font-size: 0.8rem; border-radius: 6px; border: 1px solid rgba(239,68,68,0.4); background: rgba(239,68,68,0.08); color: #ef4444; cursor: pointer; display: flex; align-items: center; gap: 6px; white-space: nowrap; transition: all 0.2s;">
                    <i class="fa-solid fa-xmark"></i> Reject
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    // Approve button listeners
    container.querySelectorAll('.approve-complaint-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            try {
                const res = await fetch(`${API_BASE}/issues/${id}/approve`, { method: 'PATCH' });
                if (res.ok) {
                    alert('✅ Complaint approved and published to public feed!');
                    fetchIssues(); // Refreshes everything
                }
            } catch (err) {
                console.error('Failed to approve:', err);
            }
        });
    });

    // Reject button listeners
    container.querySelectorAll('.reject-complaint-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            if (!confirm('Are you sure you want to reject and discard this complaint?')) return;
            try {
                const res = await fetch(`${API_BASE}/issues/${id}/reject`, { method: 'PATCH' });
                if (res.ok) {
                    alert('Complaint rejected and removed.');
                    fetchComplaintRequests(); // Refresh the list
                }
            } catch (err) {
                console.error('Failed to reject:', err);
            }
        });
    });
}

// Add Admin Filtering Interaction
function initAdminFilters() {
    const wardFilter = document.getElementById('filter-ward');
    const catFilter = document.getElementById('filter-cat');
    if (!wardFilter || !catFilter) return;

    const applyFilters = () => {
        const wf = wardFilter.value;
        const cf = catFilter.value;
        const rows = document.querySelectorAll('#admin-table-body tr');
        rows.forEach(row => {
            const textContent = row.innerText;
            const matchesWard = wf === 'all' || textContent.includes(wf);
            const matchesCat = cf === 'all' || textContent.includes(cf);
            if (matchesWard && matchesCat) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    };

    wardFilter.addEventListener('change', applyFilters);
    catFilter.addEventListener('change', applyFilters);
}

document.addEventListener("DOMContentLoaded", () => {
    // Other inits...
    setTimeout(initAdminFilters, 500); // Allow table render first
});

function renderActionEngine() {
    if (typeof buildDailyActionPlan !== 'function') return; // engine.js sanity block
    
    const plan = buildDailyActionPlan(issuesData);
    const container = document.getElementById('clustering-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (plan.topClusters.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); padding: 12px; margin: 0;">No active clusters identified today by algorithm.</p>';
        return;
    }
    
    plan.topClusters.forEach(cluster => {
        const div = document.createElement('div');
        div.className = 'glass-panel';
        div.style = 'min-width: 250px; flex: 0 0 auto; border-left: 4px solid var(--color-primary);';
        
        div.innerHTML = `
            <div style="font-size: 0.8rem; color:var(--text-muted); margin-bottom: 8px;">ID: ${cluster.id}</div>
            <h3 style="margin-bottom: 4px; color: var(--text-main); font-size: 1.1rem;">${cluster.issues.length} Issues: ${cluster.category}</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;"><i class="fa-solid fa-location-dot"></i> ${cluster.ward}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="tag tag-p-high" style="margin: 0; background: rgba(59,130,246,0.1); color: #3b82f6; border-color: #3b82f6;">Score: ${cluster.totalPriority}</span>
                <button class="btn-primary batch-resolve-btn" data-cluster="${cluster.id}" style="padding: 6px 12px; font-size: 0.8rem;">Resolve Batch</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.querySelectorAll('.batch-resolve-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert("Batch Resolution deployed to field teams.");
        });
    });
}

// --- User Profile Issues Rendering ---
function renderUserIssues() {
    const feedContainer = document.getElementById('user-issues-feed');
    if (!feedContainer) return;
    
    feedContainer.innerHTML = '';
    
    const reportedStat = document.getElementById('profile-stat-reported');
    const resolvedStat = document.getElementById('profile-stat-resolved');

    if (!currentUser) {
        if (reportedStat) reportedStat.innerText = '0';
        if (resolvedStat) resolvedStat.innerText = '0';
        feedContainer.innerHTML = '<p style="color:var(--text-muted); padding: 12px; text-align: center;">Please log in to view your reports.</p>';
        return;
    }

    // Filter issues for the current user
    const userIssues = issuesData.filter(i => i.reportedBy === currentUser.username);
    
    if (reportedStat) reportedStat.innerText = userIssues.length;
    if (resolvedStat) resolvedStat.innerText = userIssues.filter(i => i.status === 'resolved').length;

    if (userIssues.length === 0) {
        feedContainer.innerHTML = '<p style="color:var(--text-muted); padding: 12px; text-align: center;">You have not reported any issues yet.</p>';
        return;
    }

    userIssues.forEach(issue => {
        const card = document.createElement('div');
        card.className = 'card glass-panel fade-in';

        let statusLabel = '';
        if (issue.status === 'pending') statusLabel = '<i class="fa-solid fa-clock"></i> Pending';
        else if (issue.status === 'progress') statusLabel = '<i class="fa-solid fa-spinner fa-spin"></i> In Progress';
        else if (issue.status === 'resolved') statusLabel = '<i class="fa-solid fa-check"></i> Resolved';

        let falseClosureBlock = '';
        if (issue.status === 'resolved' && !issue.falseResolution) {
            falseClosureBlock = `
                <div style="width: 100%; border-top: 1px dashed var(--border-glass); margin-top: 12px; padding-top: 12px;">
                    <div style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 8px;">Resolution Verified?</div>
                    <button class="btn-secondary reopen-btn" data-id="${issue.id}" style="font-size: 0.8rem; color: #ef4444; border-color: #ef4444; padding: 4px 8px;">No, Issue Persists</button>
                    <button class="btn-secondary" style="font-size: 0.8rem; color: #10b981; border-color: #10b981; padding: 4px 8px;">Yes, Verified</button>
                </div>
            `;
        }

        let urgencyTag = issue.urgency ? `<span class="tag" style="background: rgba(255,255,255,0.1);">${issue.urgency} Urgency</span>` : '';

        card.innerHTML = `
            <div class="card-header" style="flex-wrap: wrap; gap: 8px;">
                <span class="status-badge ${issue.status}">${statusLabel}</span>
                ${urgencyTag}
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: auto;">${issue.date}</span>
            </div>
            <img src="${issue.image}" alt="Issue" class="card-image">
            <div class="card-content">
                <div style="font-size: 0.8rem; color: var(--color-primary); margin-bottom: 8px;"><i class="fa-solid fa-building-columns"></i> Routed to: ${issue.authority || 'Local Department'}</div>
                <h3>${issue.title}</h3>
                <p>${issue.desc}</p>
            </div>
            <div class="card-footer" style="flex-wrap: wrap;">
                <div class="location"><i class="fa-solid fa-location-dot"></i> ${issue.location}</div>
                ${falseClosureBlock}
            </div>
        `;
        feedContainer.appendChild(card);
    });

    // Add Reopen Listeners logic if exists in Profile
    feedContainer.querySelectorAll('.reopen-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            try {
                const response = await fetch(`${API_BASE}/issues/${id}/reopen`, { method: 'PATCH' });
                if (response.ok) {
                    alert("Issue has been successfully flagged and reopened!");
                    fetchIssues(); // Refresh feed completely
                }
            } catch (err) {
                console.error("Failed to reopen issue", err);
            }
        });
    });
}

// --- Resolved Works Mapping ---
function renderResolvedWorks() {
    const worksContainer = document.getElementById('resolved-works-feed');
    if (!worksContainer) return;
    
    worksContainer.innerHTML = '';
    
    const resolvedIssues = issuesData.filter(i => i.status === 'resolved');

    // Update Analytics Counters in Our Works section
    const resolvedStatEl = document.getElementById('works-stat-resolved');
    if (resolvedStatEl) {
        resolvedStatEl.innerText = resolvedIssues.length;
    }
    
    const areasStatEl = document.getElementById('works-stat-areas');
    if (areasStatEl && issuesData.length > 0) {
        const uniqueLocations = new Set(issuesData.map(i => i.location)).size;
        areasStatEl.innerText = Math.max(45, uniqueLocations) + '+';
    }

    if (resolvedIssues.length === 0) {
        worksContainer.innerHTML = '<p style="color:var(--text-muted); padding: 12px; text-align: center; width: 100%;">Waiting for our first successful civic operation closure!</p>';
        return;
    }

    resolvedIssues.forEach(issue => {
        const card = document.createElement('div');
        card.className = 'glass-panel fade-in';
        card.style.background = 'rgba(255,255,255,0.03)';
        card.style.borderRadius = '12px';
        card.style.border = '1px solid var(--border-glass)';
        card.style.overflow = 'hidden';

        card.innerHTML = `
            <img src="${issue.image}" alt="Completed Issue" style="width: 100%; height: 160px; object-fit: cover;">
            <div style="padding: 16px;">
                <div style="font-size: 0.8rem; color: var(--color-primary); margin-bottom: 4px;"><i class="fa-solid fa-check-double"></i> Officially Closed</div>
                <h3 style="color: var(--text-main); font-size: 1.1rem; margin-bottom: 8px;">${issue.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${issue.desc}</p>
                <div style="font-size: 0.75rem; color: #10b981;"><i class="fa-solid fa-users"></i> Cleared by: ${issue.authority || 'Local Department'}</div>
            </div>
        `;
        worksContainer.appendChild(card);
    });
}

// =========================================================
//  Review Users Drawer (Admin Only)
// =========================================================
let allFetchedUsers = [];

function initUsersDrawer() {
    const reviewCard = document.getElementById('review-users-stat-card');
    const drawer = document.getElementById('users-review-drawer');
    const backdrop = document.getElementById('users-drawer-backdrop');
    const closeBtn = document.getElementById('close-users-drawer');
    const searchInput = document.getElementById('users-search-input');

    if (!reviewCard || !drawer) return;

    function openDrawer() {
        fetchAndRenderUsers();
        drawer.style.right = '0';
        if (backdrop) backdrop.style.display = 'block';
    }

    function closeDrawer() {
        drawer.style.right = '-520px';
        if (backdrop) backdrop.style.display = 'none';
        if (searchInput) searchInput.value = '';
    }

    reviewCard.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Live search
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.toLowerCase().trim();
            const filtered = allFetchedUsers.filter(u => {
                const haystack = `${u.fullname || ''} ${u.username || ''} ${u.email || ''} ${u.phone || ''}`.toLowerCase();
                return haystack.includes(q);
            });
            renderUserCards(filtered);
        });
    }
}

async function fetchAndRenderUsers() {
    const listContainer = document.getElementById('users-drawer-list');
    const countEl = document.getElementById('users-drawer-count');
    const statUsersEl = document.getElementById('stat-users');

    if (listContainer) listContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px 0;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>Fetching users...</p>';

    try {
        const res = await fetch(`${API_BASE}/users`);
        allFetchedUsers = await res.json();

        if (countEl) countEl.textContent = `${allFetchedUsers.length} user${allFetchedUsers.length !== 1 ? 's' : ''} registered`;
        if (statUsersEl) statUsersEl.textContent = allFetchedUsers.length;

        renderUserCards(allFetchedUsers);
    } catch (err) {
        console.error('Failed to fetch users:', err);
        if (listContainer) listContainer.innerHTML = '<p style="color: #ef4444; text-align: center; padding: 40px 0;">Failed to load users. Is the server running?</p>';
    }
}

function renderUserCards(users) {
    const listContainer = document.getElementById('users-drawer-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (users.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px 0;">No users match your search.</p>';
        return;
    }

    users.forEach(u => {
        const card = document.createElement('div');

        const roleColor = u.role === 'admin' ? '#F59E0B' : '#8B5CF6';
        const roleLabel = u.role === 'admin' ? 'Admin' : 'Citizen';
        const initials = (u.fullname || u.username || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        const avatarBg = u.role === 'admin' ? '#F59E0B' : '#8B5CF6';

        // Stats bar
        const total = u.complaintsRegistered || 0;
        const resolved = u.complaintsResolved || 0;
        const pending = u.complaintsPending || 0;
        const inProgress = u.complaintsInProgress || 0;

        // Complaints list
        const complaints = u.complaints || [];
        let complaintsHTML = '';
        if (complaints.length > 0) {
            complaintsHTML = complaints.map(c => {
                let statusColor = '#F59E0B';
                let statusIcon = 'fa-clock';
                let statusText = 'Pending';
                if (c.status === 'resolved') { statusColor = '#10B981'; statusIcon = 'fa-circle-check'; statusText = 'Resolved'; }
                else if (c.status === 'progress') { statusColor = '#3B82F6'; statusIcon = 'fa-spinner'; statusText = 'In Progress'; }

                return `
                    <div style="display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
                        <i class="fa-solid ${statusIcon}" style="color: ${statusColor}; margin-top: 3px; font-size: 0.8rem; flex-shrink: 0;"></i>
                        <div style="flex: 1; min-width: 0;">
                            <div style="font-size: 0.85rem; color: var(--text-main); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.title}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 12px; margin-top: 2px;">
                                <span>${c.category}</span>
                                <span>${c.date}</span>
                                <span style="color: ${statusColor}; font-weight: 600;">${statusText}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            complaintsHTML = '<p style="color: var(--text-muted); font-size: 0.8rem; padding: 8px 0; text-align: center;">No complaints filed.</p>';
        }

        const uniqueId = 'user-complaints-' + (u.username || Math.random()).replace(/\W/g, '_');

        card.innerHTML = `
            <div style="
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 12px;
                overflow: hidden;
                transition: border-color 0.2s;
            ">
                <!-- User Header -->
                <div style="padding: 16px; display: flex; align-items: center; gap: 14px;">
                    <div style="
                        width: 44px; height: 44px; border-radius: 10px;
                        background: ${avatarBg}; color: #fff;
                        display: flex; align-items: center; justify-content: center;
                        font-weight: 700; font-size: 0.95rem; flex-shrink: 0;
                    ">${initials}</div>
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 600; font-size: 1rem; color: #fff; display: flex; align-items: center; gap: 8px;">
                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${u.fullname || u.username}</span>
                            <span style="
                                font-size: 0.65rem; padding: 2px 8px; border-radius: 4px;
                                background: ${roleColor}20; color: ${roleColor};
                                font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0;
                            ">${roleLabel}</span>
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">@${u.username}</div>
                    </div>
                </div>

                <!-- User Details -->
                <div style="padding: 0 16px 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px;">
                    <div style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-envelope" style="width: 16px; color: #3B82F6;"></i> ${u.email || 'N/A'}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-phone" style="width: 16px; color: #10B981;"></i> ${u.phone || 'N/A'}</div>
                </div>

                <!-- Stats Row -->
                <div style="
                    display: flex; padding: 10px 16px;
                    background: rgba(255,255,255,0.02);
                    border-top: 1px solid rgba(255,255,255,0.05);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    gap: 4px;
                ">
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 1.1rem; font-weight: 700; color: #8B5CF6;">${total}</div>
                        <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Total</div>
                    </div>
                    <div style="flex: 1; text-align: center; border-left: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-size: 1.1rem; font-weight: 700; color: #F59E0B;">${pending}</div>
                        <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Pending</div>
                    </div>
                    <div style="flex: 1; text-align: center; border-left: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-size: 1.1rem; font-weight: 700; color: #3B82F6;">${inProgress}</div>
                        <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Active</div>
                    </div>
                    <div style="flex: 1; text-align: center; border-left: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-size: 1.1rem; font-weight: 700; color: #10B981;">${resolved}</div>
                        <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Resolved</div>
                    </div>
                </div>

                <!-- Expandable Complaints -->
                <div style="padding: 10px 16px;">
                    <button onclick="
                        var el = document.getElementById('${uniqueId}');
                        var icon = this.querySelector('i.expand-icon');
                        if(el.style.maxHeight === '0px' || !el.style.maxHeight) {
                            el.style.maxHeight = el.scrollHeight + 'px';
                            icon.style.transform = 'rotate(180deg)';
                        } else {
                            el.style.maxHeight = '0px';
                            icon.style.transform = 'rotate(0deg)';
                        }
                    " style="
                        width: 100%; background: transparent; border: 1px dashed rgba(255,255,255,0.1);
                        color: var(--text-muted); padding: 6px 12px; border-radius: 6px;
                        cursor: pointer; font-size: 0.8rem; display: flex; align-items: center;
                        justify-content: space-between; transition: all 0.2s;
                    ">
                        <span><i class="fa-solid fa-clipboard-list" style="margin-right: 6px;"></i>View Complaints (${total})</span>
                        <i class="fa-solid fa-chevron-down expand-icon" style="transition: transform 0.3s;"></i>
                    </button>
                    <div id="${uniqueId}" style="max-height: 0; overflow: hidden; transition: max-height 0.35s ease; margin-top: 8px;">
                        ${complaintsHTML}
                    </div>
                </div>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// Wire it up in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initUsersDrawer, 200);
});


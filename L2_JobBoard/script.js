const jobs = [
    {
        title: "Frontend Developer",
        company: "TechNova Solutions",
        location: "Bangalore",
        category: "Development",
        type: "Full Time",
        salary: "₹6 - 8 LPA"
    },
    {
        title: "Java Developer",
        company: "CodeWorks India",
        location: "Hyderabad",
        category: "Development",
        type: "Full Time",
        salary: "₹5 - 7 LPA"
    },
    {
        title: "UI/UX Designer",
        company: "DesignHub Studio",
        location: "Chennai",
        category: "Design",
        type: "Internship",
        salary: "₹20k/month"
    },
    {
        title: "Data Analyst",
        company: "DataBridge Analytics",
        location: "Pune",
        category: "Data",
        type: "Full Time",
        salary: "₹4 - 6 LPA"
    },
    {
        title: "Digital Marketing Intern",
        company: "GrowMore Media",
        location: "Remote",
        category: "Marketing",
        type: "Internship",
        salary: "₹12k/month"
    },
    {
        title: "Backend Developer",
        company: "CloudCore Systems",
        location: "Mumbai",
        category: "Development",
        type: "Full Time",
        salary: "₹7 - 10 LPA"
    }
];

const jobsContainer = document.getElementById("jobsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function displayJobs(jobList) {
    jobsContainer.innerHTML = "";

    if (jobList.length === 0) {
        jobsContainer.innerHTML = "<p class='section-subtitle'>No jobs found. Try another keyword.</p>";
        return;
    }

    jobList.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <p class="job-info">📍 ${job.location} | ${job.type}</p>
            <span class="badge">${job.category}</span>
            <p class="job-info">💰 ${job.salary}</p>
            <button onclick="applyJob('${job.title}')">Apply Now</button>
        `;

        jobsContainer.appendChild(card);
    });
}

function searchJobs() {
    const keyword = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredJobs = jobs.filter(job => {
        const matchesKeyword =
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.location.toLowerCase().includes(keyword);

        const matchesCategory =
            category === "All" || job.category === category;

        return matchesKeyword && matchesCategory;
    });

    displayJobs(filteredJobs);
}

function applyJob(title) {
    alert(`You selected: ${title}\nPlease fill the application form below.`);
    document.getElementById("apply").scrollIntoView({ behavior: "smooth" });
}

displayJobs(jobs);
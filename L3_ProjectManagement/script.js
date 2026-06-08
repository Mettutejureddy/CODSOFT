let tasks = [
    {
        title: "Design Portfolio UI",
        project: "Portfolio Website",
        assignedTo: "Mettu Tejaswini",
        deadline: "2026-06-12",
        status: "Completed",
        description: "Create a professional portfolio website layout using HTML and CSS."
    },
    {
        title: "Create Quiz Questions",
        project: "Quiz Maker",
        assignedTo: "Vasundhara",
        deadline: "2026-06-14",
        status: "In Progress",
        description: "Prepare multiple choice questions and connect them with JavaScript."
    },
    {
        title: "Build Cart Feature",
        project: "E-Commerce Website",
        assignedTo: "Bhavana",
        deadline: "2026-06-16",
        status: "Pending",
        description: "Add cart functionality with total price calculation and checkout."
    }
];

const taskContainer = document.getElementById("taskContainer");
const taskForm = document.getElementById("taskForm");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const progressTasks = document.getElementById("progressTasks");
const completedTasks = document.getElementById("completedTasks");

function displayTasks() {
    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const card = document.createElement("div");
        card.className = "task-card";

        let statusClass = "";

        if (task.status === "Pending") {
            statusClass = "pending";
        } else if (task.status === "In Progress") {
            statusClass = "progress";
        } else {
            statusClass = "completed";
        }

        card.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Project:</strong> ${task.project}</p>
            <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
            <p><strong>Deadline:</strong> ${task.deadline}</p>
            <p>${task.description}</p>

            <span class="status ${statusClass}">
                ${task.status}
            </span>

            <div class="task-actions">
                <button onclick="markComplete(${index})">Mark Complete</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskContainer.appendChild(card);
    });

    updateDashboard();
}

function updateDashboard() {
    totalTasks.textContent = tasks.length;

    pendingTasks.textContent = tasks.filter(task => task.status === "Pending").length;

    progressTasks.textContent = tasks.filter(task => task.status === "In Progress").length;

    completedTasks.textContent = tasks.filter(task => task.status === "Completed").length;
}

taskForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const newTask = {
        title: document.getElementById("taskTitle").value,
        project: document.getElementById("projectName").value,
        assignedTo: document.getElementById("assignedTo").value,
        deadline: document.getElementById("deadline").value,
        status: document.getElementById("status").value,
        description: document.getElementById("description").value
    };

    tasks.push(newTask);

    displayTasks();

    taskForm.reset();

    alert("Task added successfully!");
});

function markComplete(index) {
    tasks[index].status = "Completed";
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

displayTasks();
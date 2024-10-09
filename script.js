window.onload = function() {
    const addButton = document.querySelector(".add-button");
    const inputField = document.getElementById("firstbar");
    const container = document.querySelector(".container");

    // Add new task when "+" button is clicked
    addButton.addEventListener("click", function() {
        const taskText = inputField.value.trim(); // Get input value

        if (taskText) {
            // Create a new task element
            const taskDiv = document.createElement("div");
            taskDiv.className = "tasks"; // Set class for styling
            taskDiv.innerHTML = `
                <h3>${taskText} <button class="remove-button">X</button></h3>
                <ul class="bullet-list"></ul>
                <div>
                    <input type="text" placeholder="Add bullet item...">
                    <button class="add-bullet-button">Add</button>
                </div>
            `;

            // Append the new task to the container
            container.appendChild(taskDiv);
            
            // Clear the input field
            inputField.value = "";

            // Add functionality to the new bullet button
            const addBulletButton = taskDiv.querySelector(".add-bullet-button");
            const bulletInputField = taskDiv.querySelector("input[type='text']");

            addBulletButton.addEventListener("click", function() {
                const bulletText = bulletInputField.value.trim();

                if (bulletText) {
                    // Create a new bullet list item with checkbox and remove button
                    const bulletItem = document.createElement("li");
                    bulletItem.innerHTML = `
                        <input type="checkbox" class="checkbox"> ${bulletText} 
                        <button class="remove-bullet-button" onclick="removeBullet(this)">X</button>
                    `;

                    // Append the new bullet item to the bullet list
                    taskDiv.querySelector(".bullet-list").appendChild(bulletItem);

                    // Clear bullet input field
                    bulletInputField.value = "";

                    // Add functionality to the checkbox (check/uncheck)
                    const checkbox = bulletItem.querySelector(".checkbox");
                    checkbox.addEventListener("change", function() {
                        if (this.checked) {
                            bulletItem.style.textDecoration = "line-through";
                        } else {
                            bulletItem.style.textDecoration = "none";
                        }
                    });

                    // Add functionality to remove the bullet item with "X" button
                    const removeBulletButton = bulletItem.querySelector(".remove-bullet-button");
                    removeBulletButton.addEventListener("click", function() {
                        bulletItem.remove(); // Remove the bullet item
                    });
                } else {
                    alert("Please enter a bullet item.");
                }
            });

            // Add functionality to the task's remove button
            const removeButton = taskDiv.querySelector(".remove-button");
            removeButton.addEventListener("click", function() {
                container.removeChild(taskDiv);
            });
        } else {
            alert("Please enter a task."); // Alert if input is empty
        }
    });

    // Optional: Add functionality to remove tasks via event delegation (for dynamic content)
    container.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-button")) {
            const taskToRemove = event.target.closest(".tasks");
            container.removeChild(taskToRemove);
        }
    });
};

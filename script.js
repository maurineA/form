document.addEventListener('DOMContentLoaded', function() {
    var familyMembersInput = document.getElementById('familyMembers');

    familyMembersInput.addEventListener('change', function () {
        var count = parseInt(this.value);
        var accordion = document.getElementById('familyAccordion');
        accordion.innerHTML = '';

        for (var i = 0; i < count; i++) {
            var accordionButton = document.createElement('button');
            accordionButton.className = 'accordion';
            accordionButton.textContent = 'Family Member ' + (i + 1);
            accordionButton.type = 'button';
            
            var panel = document.createElement('div');
            panel.className = 'panel';

            var firstNameLabel = document.createElement('label');
            firstNameLabel.textContent = 'First Name:';
            panel.appendChild(firstNameLabel);

            var firstNameInput = document.createElement('input');
            firstNameInput.type = 'text';
            firstNameInput.name = 'familyMember' + (i + 1) + 'FirstName';
            firstNameInput.required = true;
            panel.appendChild(firstNameInput);

            var lastNameLabel = document.createElement('label');
            lastNameLabel.textContent = 'Last Name:';
            panel.appendChild(lastNameLabel);

            var lastNameInput = document.createElement('input');
            lastNameInput.type = 'text';
            lastNameInput.name = 'familyMember' + (i + 1) + 'LastName';
            lastNameInput.required = true;
            panel.appendChild(lastNameInput);

            var emailLabel = document.createElement('label');
            emailLabel.textContent = 'Email:';
            panel.appendChild(emailLabel);

            var emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.name = 'familyMember' + (i + 1) + 'Email';
            emailInput.required = true;
            panel.appendChild(emailInput);

            var contactLabel = document.createElement('label');
            contactLabel.textContent = 'Contact:';
            panel.appendChild(contactLabel);

            var contactInput = document.createElement('input');
            contactInput.type = 'text';
            contactInput.name = 'familyMember' + (i + 1) + 'Contact';
            contactInput.required = true;
            panel.appendChild(contactInput);

            var birthdayLabel = document.createElement('label');
            birthdayLabel.textContent = 'Birthday (DD/MM):';
            panel.appendChild(birthdayLabel);

            var birthdayInput = document.createElement('input');
            birthdayInput.type = 'text';
            birthdayInput.name = 'familyMember' + (i + 1) + 'Birthday';
            birthdayInput.pattern = '(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])';
            birthdayInput.placeholder = 'DD/MM';
            birthdayInput.required = true;
            panel.appendChild(birthdayInput);

            accordion.appendChild(accordionButton);
            accordion.appendChild(panel);
        }

        // Add event listeners for accordion buttons
        var accordions = document.getElementsByClassName('accordion');
        for (var i = 0; i < accordions.length; i++) {
            accordions[i].addEventListener('click', function() {
                this.classList.toggle('active');
                var panel = this.nextElementSibling;
                if (panel.style.display === 'block') {
                    panel.style.display = 'none';
                } else {
                    panel.style.display = 'block';
                }
            });
        }
    });

    familyMembersInput.dispatchEvent(new Event('change')); // Trigger change event on page load

    // Validation for birthday input
    document.addEventListener('input', function(event) {
        if (event.target && event.target.name.includes('Birthday')) {
            var pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
            if (!pattern.test(event.target.value)) {
                event.target.setCustomValidity('Please enter a valid date in DD/MM format.');
            } else {
                event.target.setCustomValidity('');
            }
        }
    });
});

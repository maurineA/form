document.addEventListener('DOMContentLoaded', function() {
    const existingEmails = new Set(['test1@example.com', 'test2@example.com']);
    const existingContacts = new Set(['1234567890', '0987654321']);

    const phoneInputField = document.querySelector("#phone");

    const phoneInput = window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io/json?token=e9dc139274e8e5')
                .then(response => response.json())
                .then(data => {
                    const countryCode = data.country ? data.country : 'ke';
                    callback(countryCode);
                })
                .catch(() => callback('ke'));
        }
    });

    $("#birthdate").datepicker({
        changeMonth: true,
        changeYear: false,
        dateFormat: 'dd MM',
        showButtonPanel: true,
        closeText: 'Select'
    });

    var familyMembersInput = document.getElementById('familyMembers');

    familyMembersInput.addEventListener('change', function () {
        var count = parseInt(this.value);
        var accordion = document.getElementById('familyAccordion');
        accordion.innerHTML = '';

        for (var i = 0; i < count; i++) {
            (function(i) {
                var accordionButton = document.createElement('button');
                accordionButton.className = 'accordion';
                accordionButton.textContent = 'Family Member ' + (i + 1);
                accordionButton.type = 'button';

                var panel = document.createElement('div');
                panel.className = 'panel';

                var adultRadioLabel = document.createElement('label');
                adultRadioLabel.textContent = 'Adult';
                panel.appendChild(adultRadioLabel);

                var adultRadioInput = document.createElement('input');
                adultRadioInput.type = 'radio';
                adultRadioInput.name = 'familyMember' + (i + 1) + 'Type';
                adultRadioInput.value = 'adult';
                adultRadioInput.checked = true;
                panel.appendChild(adultRadioInput);

                var childRadioLabel = document.createElement('label');
                childRadioLabel.textContent = 'Child';
                panel.appendChild(childRadioLabel);

                var childRadioInput = document.createElement('input');
                childRadioInput.type = 'radio';
                childRadioInput.name = 'familyMember' + (i + 1) + 'Type';
                childRadioInput.value = 'child';
                panel.appendChild(childRadioInput);

                var firstNameInput = document.createElement('input');
                firstNameInput.type = 'text';
                firstNameInput.name = 'familyMember' + (i + 1) + 'FirstName';
                firstNameInput.placeholder = 'First Name';
                firstNameInput.required = true;
                panel.appendChild(firstNameInput);

                var lastNameInput = document.createElement('input');
                lastNameInput.type = 'text';
                lastNameInput.name = 'familyMember' + (i + 1) + 'LastName';
                lastNameInput.placeholder = 'Last Name';
                lastNameInput.required = true;
                panel.appendChild(lastNameInput);

                var emailContactDiv = document.createElement('div');
                emailContactDiv.className = 'emailContactDiv';

                var emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.name = 'familyMember' + (i + 1) + 'Email';
                emailInput.placeholder = 'Email';
                emailInput.required = true;
                emailContactDiv.appendChild(emailInput);

                var contactInput = document.createElement('input');
                contactInput.type = 'tel';
                contactInput.name = 'familyMember' + (i + 1) + 'Phone';
                contactInput.placeholder = 'Phone Number';
                contactInput.required = true;
                emailContactDiv.appendChild(contactInput);

                panel.appendChild(emailContactDiv);

                var birthdayLabel = document.createElement('label');
                panel.appendChild(birthdayLabel);

                var birthdayInput = document.createElement('input');
                birthdayInput.type = 'text';
                birthdayInput.name = 'familyMember' + (i + 1) + 'Birthdate';
                birthdayInput.placeholder = 'Birthdate';
                birthdayInput.required = true;
                panel.appendChild(birthdayInput);

                accordion.appendChild(accordionButton);
                accordion.appendChild(panel);

                accordionButton.addEventListener('click', function () {
                    this.classList.toggle('active');
                    var panel = this.nextElementSibling;
                    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
                });

                adultRadioInput.addEventListener('change', function () {
                    if (this.checked) {
                        emailContactDiv.style.display = 'block';
                        emailInput.required = true;
                        contactInput.required = true;
                        panel.removeChild(birthdayInput);
                        birthdayInput = document.createElement('input');
                        birthdayInput.type = 'text';
                        birthdayInput.name = 'familyMember' + (i + 1) + 'Birthdate';
                        birthdayInput.placeholder = 'Birthdate';
                        birthdayInput.required = true;
                        birthdayInput.className = 'adult';
                        panel.appendChild(birthdayInput);

                        $(birthdayInput).datepicker({
                            changeMonth: true,
                            changeYear: false,
                            dateFormat: 'dd MM',
                            showButtonPanel: true,
                            closeText: 'Select'
                        });

                        window.intlTelInput(contactInput, {
                            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
                            initialCountry: "auto",
                            geoIpLookup: function(callback) {
                                fetch('https://ipinfo.io/json?token=e9dc139274e8e5')
                                    .then(response => response.json())
                                    .then(data => {
                                        const countryCode = data.country ? data.country : 'us';
                                        callback(countryCode);
                                    })
                                    .catch(() => callback('us'));
                            }
                        });
                    }
                });

                childRadioInput.addEventListener('change', function () {
                    if (this.checked) {
                        emailContactDiv.style.display = 'none';
                        emailInput.required = false;
                        contactInput.required = false;
                        panel.removeChild(birthdayInput);
                        birthdayInput = document.createElement('input');
                        birthdayInput.type = 'text';
                        birthdayInput.name = 'familyMember' + (i + 1) + 'Birthdate';
                        birthdayInput.placeholder = 'Birthdate';
                        birthdayInput.required = true;
                        panel.appendChild(birthdayInput);

                        $(birthdayInput).datepicker({
                            changeMonth: true,
                            changeYear: true,
                            dateFormat: 'dd MM yy',
                            yearRange: "c-100:c+0",
                            beforeShow: function(input, inst) {
                                var years = $(this).datepicker('option', 'yearRange').split(":");
                                var currentYear = new Date().getFullYear();
                                inst.dpDiv.find('.ui-datepicker-year option[value="' + currentYear + '"]').hide();
                            }
                        });
                    }
                });

                $(birthdayInput).datepicker({
                    changeMonth: true,
                    changeYear: false,
                    dateFormat: 'dd MM',
                    showButtonPanel: true,
                    closeText: 'Select'
                });

                window.intlTelInput(contactInput, {
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
                    initialCountry: "auto",
                    geoIpLookup: function(callback) {
                        fetch('https://ipinfo.io/json?token=e9dc139274e8e5')
                            .then(response => response.json())
                            .then(data => {
                                const countryCode = data.country ? data.country : 'us';
                                callback(countryCode);
                            })
                            .catch(() => callback('us'));
                    }
                });
            })(i);
        }
    });

    const form = document.forms['submit-to-google-sheet'];

    form.addEventListener('submit', e => {
        e.preventDefault();

        const emailInputs = form.querySelectorAll('input[type="email"]');
        const contactInputs = form.querySelectorAll('input[type="tel"]');

        var emailSet = new Set([...existingEmails]);
        var contactSet = new Set([...existingContacts]);

        for (var emailInput of emailInputs) {
            if (emailSet.has(emailInput.value)) {
                alert('Duplicate email found: ' + emailInput.value);
                return;
            } else {
                emailSet.add(emailInput.value);
            }
        }

        for (var contactInput of contactInputs) {
            const iti = window.intlTelInputGlobals.getInstance(contactInput);
            const fullPhoneNumber = iti.getNumber(); // Get the full phone number including country code

            if (contactSet.has(fullPhoneNumber)) {
                alert('Duplicate contact found: ' + fullPhoneNumber);
                return;
            } else {
                contactSet.add(fullPhoneNumber);
                contactInput.value = fullPhoneNumber; // Update the contact input value to the full phone number
            }
        }

        const scriptURL = 'https://script.google.com/macros/s/AKfycbwASaIRUq10RvldssU1d9zRFnYAevvU66rQpf_egYCbmrOrPk4_4_uR84HuuEpnf9dTug/exec';
        const formData = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    alert('Form submitted successfully!', response);
                    form.reset();
                } else {
                    alert('Error!', response);
                }
            })
            .catch(error => alert('There was an error submitting the form.', error.message));
    });
});
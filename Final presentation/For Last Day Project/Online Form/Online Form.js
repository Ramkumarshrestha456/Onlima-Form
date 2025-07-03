<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Advanced Interactive Form</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to right, #74ebd5, #acb6e5);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .form-container {
      background: #fff;
      padding: 2rem;
      border-radius: 15px;
      width: 100%;
      max-width: 600px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.2rem;
    }

    label {
      display: block;
      margin-bottom: 0.4rem;
      font-weight: bold;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    select {
      width: 100%;
      padding: 0.6rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      outline: none;
    }

    .checkbox-group, .radio-group {
      display: flex;
      gap: 1rem;
      margin-top: 0.4rem;
    }

    .password-meter {
      height: 6px;
      width: 100%;
      margin-top: 5px;
      background-color: #eee;
      border-radius: 5px;
      overflow: hidden;
    }

    .password-meter div {
      height: 100%;
      width: 0%;
      background-color: red;
      transition: width 0.3s ease;
    }

    .error {
      color: red;
      font-size: 0.9rem;
      margin-top: 0.3rem;
      display: none;
    }

    .form-footer {
      margin-top: 1.5rem;
    }

    button {
      width: 100%;
      padding: 0.8rem;
      background: #007BFF;
      color: white;
      font-size: 1rem;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }

    .modal {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      display: none;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      max-width: 400px;
    }

    @media(max-width: 600px) {
      .form-container {
        padding: 1.2rem;
      }
    }
  </style>
</head>
<body>

  <div class="form-container">
    <h2>Workshop Registration Form</h2>
    <form id="workshopForm" novalidate>
      <div class="form-group">
        <label for="fullname">Full Name</label>
        <input type="text" id="fullname" required />
        <div class="error" id="nameError">Full name is required</div>
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" required />
        <div class="error" id="emailError">Please enter a valid email</div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" required />
        <div class="password-meter"><div id="meterBar"></div></div>
      </div>

      <div class="form-group">
        <label>Gender</label>
        <div class="radio-group">
          <label><input type="radio" name="gender" value="Male" /> Male</label>
          <label><input type="radio" name="gender" value="Female" /> Female</label>
          <label><input type="radio" name="gender" value="Other" /> Other</label>
        </div>
      </div>

      <div class="form-group">
        <label>Areas of Interest</label>
        <div class="checkbox-group">
          <label><input type="checkbox" value="JavaScript" /> JS</label>
          <label><input type="checkbox" value="Node.js" /> Node.js</label>
          <label><input type="checkbox" value="React" /> React</label>
        </div>
      </div>

      <div class="form-group">
        <label for="country">Country</label>
        <select id="country">
          <option value="">-- Select --</option>
          <option>Nepal</option>
          <option>India</option>
          <option>Australia</option>
          <option>USA</option>
        </select>
      </div>

      <div class="form-group">
        <label><input type="checkbox" id="terms" /> I agree to the terms & conditions</label>
        <div class="error" id="termsError">You must agree to the terms</div>
      </div>

      <div class="form-footer">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>

  <div class="modal" id="successModal">
    <div class="modal-content">
      <h3>🎉 Registration Successful!</h3>
      <p>Thank you for joining the workshop.</p>
      <button onclick="document.getElementById('successModal').style.display='none'">Close</button>
    </div>
  </div>

  <script>
  const form = document.getElementById('workshopForm');
  const name = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const terms = document.getElementById('terms');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const termsError = document.getElementById('termsError');
  const meterBar = document.getElementById('meterBar');
  const successModal = document.getElementById('successModal');

  // Password strength meter
  password.addEventListener('input', () => {
    const val = password.value;
    let strength = 0;
    if (val.length > 5) strength += 1;
    if (val.match(/[A-Z]/)) strength += 1;
    if (val.match(/[0-9]/)) strength += 1;
    if (val.match(/[^a-zA-Z0-9]/)) strength += 1;

    const colors = ['red', 'orange', 'yellowgreen', 'green'];
    meterBar.style.width = `${(strength / 4) * 100}%`;
    meterBar.style.backgroundColor = colors[strength - 1] || 'transparent';
  });

  // Form validation and submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (name.value.trim() === "") {
      nameError.style.display = "block";
      valid = false;
    } else {
      nameError.style.display = "none";
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(emailPattern)) {
      emailError.style.display = "block";
      valid = false;
    } else {
      emailError.style.display = "none";
    }

    if (!terms.checked) {
      termsError.style.display = "block";
      valid = false;
    } else {
      termsError.style.display = "none";
    }

    if (valid) {
      successModal.style.display = "flex";

      // Optional: Save to localStorage or console log
      const selectedGender = document.querySelector('input[name="gender"]:checked')?.value || "";
      const selectedInterests = [...document.querySelectorAll('input[type="checkbox"]:checked')]
        .map(cb => cb.value);
      const country = document.getElementById('country').value;

      const userData = {
        name: name.value,
        email: email.value,
        gender: selectedGender,
        interests: selectedInterests,
        country: country
      };

      console.log("Form Data Submitted:", userData);
      // localStorage.setItem("registrationData", JSON.stringify(userData));

      // Reset form after showing modal
      form.reset();
      meterBar.style.width = '0%';
    }
  });

</script>

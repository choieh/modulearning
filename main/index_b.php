<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KIRA Education</title>
  <link rel="stylesheet" href="style.css">
  <style>
  /* Reset styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Global styles */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header styles */
#header {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}

#header .logo img {
  max-width: 150px;
}

nav ul {
  list-style: none;
  display: flex;
  align-items: center;
}

nav ul li + li {
  margin-left: 30px;
}

nav ul li a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
}

nav ul li a:hover {
  color: #f00;
}

/* Main styles */
#main {
  padding: 60px 0;
}

.visual {
  height: 500px;
  background-image: url('https://modulearning.kr/img/main/visual.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.visual:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
}

.visual-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #333;
}

.visual-text h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.visual-text p {
  font-size: 24px;
  margin-bottom: 40px;
}

.about-us h2 {
  margin-bottom: 20px;
}

.about-us p {
  margin-bottom: 40px;
}

.curriculum h2 {
  margin-bottom: 20px;
}

.curriculum-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
}

.curriculum-item img {
  max-width: 200px;
  margin-bottom: 20px;
}

.curriculum-item h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.curriculum-item p {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.contact-us h2 {
  margin-bottom: 20px;
}

.contact-us p {
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight:bold;
}

.form-group input,
.form-group textarea {
width: 100%;
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
}

button[type="submit"] {
background-color: #f00;
color: #fff;
border: none;
border-radius: 4px;
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
}

button[type="submit"]:hover {
background-color: #b30000;
}

/* Footer styles */
#footer {
background-color: #333;
color: #fff;
padding: 20px 0;
text-align: center;
}

#footer p {
margin: 0;
}

#footer a {
color: #fff;
text-decoration: none;
}

#footer a:hover {
text-decoration: underline;
}

  </style>
</head>
<body>
  <header id="header">
    <div class="container">
      <a href="#" class="logo"><img src="https://modulearning.kr/img/main/logo.png" alt="KIRA Education"></a>
      <nav>
        <ul>
          <li><a href="#">HOME</a></li>
          <li><a href="#">ABOUT US</a></li>
          <li><a href="#">CURRICULUM</a></li>
          <li><a href="#">CONTACT US</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main id="main">
    <section class="visual">
      <div class="container">
        <div class="visual-text">
          <h1>Let's Learn Together with KIRA Education</h1>
          <p>We provide online and offline education for all ages</p>
        </div>
      </div>
    </section>
    <section class="about-us">
      <div class="container">
        <h2>About Us</h2>
        <p>KIRA Education is a leading education company that provides high-quality online and offline education programs for all ages. We are committed to providing personalized learning experiences and helping our students achieve their full potential.</p>
      </div>
    </section>
    <section class="curriculum">
      <div class="container">
        <h2>Curriculum</h2>
        <div class="curriculum-list">
          <div class="curriculum-item">
            <img src="https://modulearning.kr/img/main/curriculum1.png" alt="Curriculum Item 1">
            <h3>Online Classes</h3>
            <p>Our online classes are designed to be engaging and interactive, with live instructors and small class sizes.</p>
          </div>
          <div class="curriculum-item">
            <img src="https://modulearning.kr/img/main/curriculum2.png" alt="Curriculum Item 2">
            <h3>Offline Classes</h3>
            <p>Our offline classes are held at our modern facilities, with experienced instructors and personalized learning plans.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="contact-us">
      <div class="container">
        <h2>Contact Us</h2>
        <p>If you have any questions or comments, please feel free to contact us.</p>
        <form>
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
			<textarea id="message" name="message"></textarea>
			</div>
			<button type="submit">Send</button>
			</form>
			</div>
			</section>

			  </main>
			  <footer id="footer">
				<div class="container">
				  <p>&copy; 2023 KIRA Education. All rights reserved.</p>
				</div>
			  </footer>
			</body>
			</html>

<?php
    //Replace this with your secret key from the citrus panel
	$secret_key = "371425c568ac70333e0b24652591ea6126de9827";
	 
	$data = "";
	$flag = "true";
	if(isset($_POST['TxId'])) {
		$txnid = $_POST['TxId'];
		$data .= $txnid;
	}
	 if(isset($_POST['TxStatus'])) {
		$txnstatus = $_POST['TxStatus'];
		$data .= $txnstatus;
	 }
	 if(isset($_POST['amount'])) {
		$amount = $_POST['amount'];
		$data .= $amount;
	 }
	 if(isset($_POST['pgTxnNo'])) {
		$pgtxnno = $_POST['pgTxnNo'];
		$data .= $pgtxnno;
	 }
	 if(isset($_POST['issuerRefNo'])) {
		$issuerrefno = $_POST['issuerRefNo'];
		$data .= $issuerrefno;
	 }
	 if(isset($_POST['authIdCode'])) {
		$authidcode = $_POST['authIdCode'];
		$data .= $authidcode;
	 }
	 if(isset($_POST['firstName'])) {
		$firstName = $_POST['firstName'];
		$data .= $firstName;
	 }
	 if(isset($_POST['lastName'])) {
		$lastName = $_POST['lastName'];
		$data .= $lastName;
	 }
	 if(isset($_POST['pgRespCode'])) {
		$pgrespcode = $_POST['pgRespCode'];
		$data .= $pgrespcode;
	 }
	 if(isset($_POST['addressZip'])) {
		$pincode = $_POST['addressZip'];
		$data .= $pincode;
	 }
	 if(isset($_POST['signature'])) {
		$signature = $_POST['signature'];
	 }
	 
    $respSignature = hash_hmac('sha1', $data, $secret_key);
	 if($signature != "" && strcmp($signature, $respSignature) != 0) {
		$flag = "false";
	 }
    ?>
    <html>
    <head>
        <meta HTTP-EQUIV="Content-Type" CONTENT="text/html;CHARSET=iso-8859-1">
		 <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous" >
		 <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
		 <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
		 <style>
		 @import url("//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css");
			.box{max-width:600px;margin:50 auto;background:#efefef;padding:50px}
			body{font-family:'Open Sans', sans-serif;}
			.footer-distributed{
	background-color: #3f4042;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
	box-sizing: border-box;
	width: 100%;
	text-align: left;
	font: bold 16px sans-serif;

	padding: 55px 50px;
	margin-top: 80px;
}

.footer-distributed .footer-left,
.footer-distributed .footer-center,
.footer-distributed .footer-right{
	display: inline-block;
	vertical-align: top;
}

/* Footer left */

.footer-distributed .footer-left{
	width: 40%;
}

/* The company logo */

.footer-distributed h3{
	color:  #ffffff;
	font: normal 36px, cursive;
	margin: 0;
}

.footer-distributed h3 span{
	color:  #5383d3;
}

/* Footer links */

.footer-distributed .footer-links{
	color:  #ffffff;
	margin: 20px 0 12px;
	padding: 0;
}

.footer-distributed .footer-links a{
	display:inline-block;
	line-height: 1.8;
	text-decoration: none;
	color:  inherit;
}

.footer-distributed .footer-company-name{
	color:  #8f9296;
	font-size: 14px;
	font-weight: normal;
	margin: 0;
}

/* Footer Center */

.footer-distributed .footer-center{
	width: 35%;
}

.footer-distributed .footer-center i{
	background-color:  #33383b;
	color: #ffffff;
	font-size: 25px;
	width: 38px;
	height: 38px;
	border-radius: 50%;
	text-align: center;
	line-height: 42px;
	margin: 10px 15px;
	vertical-align: middle;
}

.footer-distributed .footer-center i.fa-envelope{
	font-size: 17px;
	line-height: 38px;
}

.footer-distributed .footer-center p{
	display: inline-block;
	color: #ffffff;
	vertical-align: middle;
	margin:0;
}

.footer-distributed .footer-center p span{
	display:block;
	font-weight: normal;
	font-size:14px;
	line-height:2;
}

.footer-distributed .footer-center p a{
	color:  #5383d3;
	text-decoration: none;;
}


/* Footer Right */

.footer-distributed .footer-right{
	width: 20%;
}

.footer-distributed .footer-company-about{
	line-height: 20px;
	color:  #92999f;
	font-size: 13px;
	font-weight: normal;
	margin: 0;
}

.footer-distributed .footer-company-about span{
	display: block;
	color:  #ffffff;
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 20px;
}

.footer-distributed .footer-icons{
	margin-top: 25px;
}

.footer-distributed .footer-icons a{
	display: inline-block;
	width: 35px;
	height: 35px;
	cursor: pointer;
	background-color:  #33383b;
	border-radius: 2px;

	font-size: 20px;
	color: #ffffff;
	text-align: center;
	line-height: 35px;

	margin-right: 3px;
	margin-bottom: 5px;
}

/* If you don't want the footer to be responsive, remove these media queries */

@media (max-width: 880px) {

	.footer-distributed{
		font: bold 14px sans-serif;
	}

	.footer-distributed .footer-left,
	.footer-distributed .footer-center,
	.footer-distributed .footer-right{
		display: block;
		width: 100%;
		margin-bottom: 40px;
		text-align: center;
	}

	.footer-distributed .footer-center i{
		margin-left: 0;
	}

}
		 </style>
    </head>
    <body>
		<nav class="navbar navbar-default">
			<div class="container" style="height:70px">
		  <div class="container-fluid">
			<div class="navbar-header">
			  <a class="navbar-brand" href="#">
				<img src="logo.png" style="width:60%">
			  </a>
			</div>
		  </div>
		  </div>
		</nav> 
        <?php 
        if ($flag == "true") {	
        ?>
        <!--Your Unique Transaction/Order Id : <?php  //// echo $txnid ?>
        Transaction Status : <?php // echo $txnstatus ?>-->
		<div class="container">
			<div class="box text-center">
				<h3>You have successfully submitted your order!</h3>
				<h3>Thanks for your purchase</h3>
				<p>Your Unique Transaction/Order Id : <?php   echo $txnid ?></p>
				<p>Transaction Status : <?php  echo $txnstatus ?></p>
			</div>
		</div>
		
		
        <?php } else { ?>
		<div class="container">
			<div class="box text-center">
				<h4>Citrus Response Signature and Our (Merchant) Signature Mis-Mactch </h4>
			</div>
		</div>
        <?php }	?>
		
		
		
		 <footer class="footer-distributed" style="font-family:Raleway">

			<div class="footer-left">

				<!-- <h3>Company<span>logo</span></h3>-->

				<p class="footer-links">
					<a href="#">Home</a>
					·
					<a href="#">Blog</a>
					·
					<a href="#">Pricing</a>
					·
					<a href="#">About</a>
					·
					<a href="#">Faq</a>
					·
					<a href="#">Contact</a>
				</p>

				<p class="footer-company-name">Company Name &copy; 2016</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>21 Revolution Street</span> Mumbai, India</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+91 1234567890</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">support@company.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

				<div class="footer-icons">

					<a href="#"><i class="fa fa-facebook" style="padding:8px"></i></a>
					<a href="#"><i class="fa fa-twitter" style="padding:8px"></i></a>
					<a href="#"><i class="fa fa-linkedin" style="padding:8px"></i></a>
					

				</div>

			</div>

		</footer>
		
		<script src="https://code.jquery.com/jquery-2.2.2.min.js" integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI=" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    </body>
    </html>
          
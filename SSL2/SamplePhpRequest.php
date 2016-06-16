
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
 <html>
     <head>
         <meta HTTP-EQUIV="Content-Type" CONTENT="text/html;CHARSET=iso-8859-1">
		 <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous" >
		 <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
		 <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
		 
	</head>
	<style>
		@import url("//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css");
		.gold{color: #FFBF00;}
		.product-details{line-height:2.4;font-size:16px}
		body{font-family: 'Open Sans', sans-serif;}
		.product-img{border:1px solid #efefef;}
		.product-img img{padding:50px}
		.tab-content{line-height:1.6;text-align:left}
		.tab-pane div{margin-top:10px}
		
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
     <body>
	
         <?php
    //Need to replace the last part of URL("your-vanityUrlPart") with your Testing/Live URL
    $formPostUrl = "https://sandbox.citruspay.com/sslperf/johntest";	
    //Need to change with your Secret Key
    $secret_key = "371425c568ac70333e0b24652591ea6126de9827";	        
    //Need to change with your Vanity URL Key from the citrus panel
    $vanityUrl = "johntest";
	
	
    //Should be unique for every transaction
    $merchantTxnId = uniqid(); 
	//Need to change with your Order Amount
    $orderAmount = "1.00";
    $currency = "INR";
    $data= $vanityUrl.$orderAmount.$merchantTxnId.$currency;
    //Need to change with your Return URL
    $returnURL = "www.YourDomain.com/ResponsePage";
    //Need to change with your Notify URL
    $notifyUrl = "www.YourDomain.com/notifyResponsePage";

    $securitySignature = hash_hmac('sha1', $data, $secret_key);
         ?>	
         <form align="center" method="post" action="<?php echo $formPostUrl ?>">
				 
				 <input type="hidden" id="merchantTxnId" name="merchantTxnId" value="<?php echo $merchantTxnId ?>" />
				 <input type="hidden" id="orderAmount" name="orderAmount" value="<?php echo $orderAmount ?>" />
				 <input type="hidden" id="firstName" name="firstName" value="" />
				 <input type="hidden" id="email" name="email" value="" />
				<input type="hidden" id="currency" name="currency" value="<?php echo $currency ?>" />
				<input type="hidden" name="returnUrl" value="http://localhost/phpintegrate/coupon/SamplePhpResponse.php" />
				 <input type="hidden" id="secSignature" name="secSignature" value="<?php echo $securitySignature ?>" />
			 
             
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
		<div class="container" id="product-section">
		   <div class="row">
			   <div class="col-md-6 product-img">
					<img src="img1.jpg" class="img-responsive">
			   </div>
			   <div class="col-md-6">
					<h2>Framely Eye Glasses</h2>
					<div class="product-rating"><i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star-o"></i> Rating : 4 Star	 </div>
					<hr>
					<div class="product-details">
						<div class="col-sm-4">
							<b>Manufacturer</b> :
						</div>
						<div class="col-sm-4">
							Zing Architect
						</div> <br />
						<div class="col-sm-4">
							<b>Availibility</b> :
						</div>
						<div class="col-sm-4">
							<span style="color:green">In Stock</span>
						</div> <br />
						<div class="col-sm-4">
							<b>Product Code</b> :
						</div>
						<div class="col-sm-4">
							PS02
						</div> <br />
						<div class="col-sm-4">
							<b>Price</b> : 
						</div>
						<div class="col-sm-4">
							<span style="color:red">&#8377; 1.00</span> 
						</div> <br />
						
						<input type="Submit" class="btn btn-primary" style="margin-top:30px" value="Pay Now"/>
						<hr>
						<!-- Nav tabs -->
						<ul class="nav nav-tabs" role="tablist">
						 <li role="presentation" class="active">
						  <a href="#description"
						   aria-controls="description"
						   role="tab"
						   data-toggle="tab"
						  >Description</a>
						 </li>
						 <li role="presentation">
						  <a href="#features"
						   aria-controls="features"
						   role="tab"
						   data-toggle="tab"
						  >Features</a>
						 </li>
						 <li role="presentation">
						  <a href="#reviews"
						   aria-controls="reviews"
						   role="tab"
						   data-toggle="tab"
						  >Reviews</a>
						 </li>
						</ul>
						<!-- Tab panes -->
						<div class="tab-content">
						 <div role="tabpanel" class="tab-pane active" id="description">
							<div class="col-sm-12">
								This Stylish Eyeglass Frame For Men And Women From The Storehouse Of Super Traders Is Stylish And Useful At The Same Time. This Frame Featuring Full Rim Will Flatter Every Kind Of Face Shape With Absolute Perfection. 
							</div>
						 </div>
						 <div role="tabpanel" class="tab-pane top-10" id="features">
							<div class="col-sm-12">
								<ul><li>Flexible Body</li>
									<li>Designer Frames</li>
									<li>Colorfull Frames</li>
									<li>Low Price</li>
								</ul>
							</div>							
						 </div>
						 <div role="tabpanel" class="tab-pane" id="reviews">
						  <div class="col-md-12">
						
							<div class="row">
							<div class="col-md-12">
								<span class="glyphicon glyphicon-star gold"></span>
								<span class="glyphicon glyphicon-star gold"></span>
								<span class="glyphicon glyphicon-star gold"></span>
								<span class="glyphicon glyphicon-star gold"></span>
								<span class="glyphicon glyphicon-star-empty"></span>
								Anonymous
								<span class="pull-right">10 days ago</span>
								<p>This product was great in terms of quality. I would definitely buy another!</p>
							</div>
							</div>
							<hr>
						 </div>
						</div>
					</div>
			   </div>
		   </div><!-- end row -->
		</div><!-- end container -->
		</div> 
         </form>
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
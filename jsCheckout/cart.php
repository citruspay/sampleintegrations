<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Shop Item </title>
    <!-- Bootstrap Core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous" >
	<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
		 <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
		 
    <!-- Custom CSS -->
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
</head>
<?php
		 // $access_key = "27AOYSJCQOR6VZ39V7JV"; //put your own access_key - found in admin panel local testopus
		 // $access_key = "SBBQ6ZMAR9NQ3KWK5B3B"; //put your own access_key - found in admin panel staging nagama 
		 // $access_key = "1TYOTI9P0VFYA179DZSY"; //put your own access_key - found in admin panel staging ravi  
		 // $access_key = "WEO99TS6PQ1ZHERXP0NZ"; //put your own access_key - found in admin panel staging citrus bank
		 // $access_key = "V0NWHUREBX77SEFO9AUL"; //put your own access_key - found in admin panel power nagama
		 // $access_key = "E5FPGJXGZR774NBYNS11"; //put your own access_key - found in admin panel sandbox mytest
		 // $access_key = "18IZE4MDYJTCKUCJ3N67"; //put your own access_key - found in admin panel sandbox nagama2
		  $access_key = "SBBQ6ZMAR9NQ3KWK5B3B"; //put your own access_key - found in admin panel sandbox nagama
		 // $access_key = "CXHXWO8HGW41HAB1LI32"; //put your own access_key - found in admin panel sandbox indiamart
		 // $access_key = "06SLEEBYLVZELISZ5ECU"; //put your own access_key - found in admin panel production shardul
		 // $access_key = "76O1QQMAXZU8SW10BO5T"; //put your own access_key - found in admin panel production l1 support
		 // $access_key = "E0127OE6C7D2KDRGW693"; //put your own access_key - found in admin panel production
		 // $access_key = "GVY0QOXF6JTR93WBFOWX"; //put your own access_key - found in admin panel sandbox ABOF
		 
		 // $secret_key = "5a1fb4e453d81782e94549087eceff67be99c1c9"; //put your own secret_key - found in admin panel local testopus
		 // $secret_key = "9cb8adb33795e35b614dc48615cd2187f23d007e"; //put your own secret_key - found in admin panel staging nagama
		 // $secret_key = "15299e935cf03bd93eaf0e7c5702367b97532185"; //put your own secret_key - found in admin panel staging ravi
		 // $secret_key = "9c350b57ebb6562adaf389972c717a33b893d4f8"; //put your own secret_key - found in admin panel staging citrus bank
		 // $secret_key = "633b2744d5e3de9117d91687e9d23d23f0bcf8a9"; //put your own secret_key - found in admin panel power nagama
         // $secret_key = "a0a7e586032ce7e98b25a65fac4335173bdf6dfa"; //put your own secret_key - found in admin panel sandbox my test
         // $secret_key = "259fe54d60ff40cf244702ab62cc8befa1d3d11c"; //put your own secret_key - found in admin panel sandbox nagama2
          $secret_key = "9cb8adb33795e35b614dc48615cd2187f23d007e"; //put your own secret_key - found in admin panel sandbox nagama
         // $secret_key = "0ec3df398197aa8cd5c600c6fb1b4840895dd1db"; //put your own secret_key - found in admin panel sandbox indiamart
         // $secret_key = "d097b7c3fd065d9f5926791578570a96baa776b7"; //put your own secret_key - found in admin panel production shardul
         // $secret_key = "c4e2fbe93188d7a1578d0f026eae42779cc4298e"; //put your own secret_key - found in admin panel production l1 support
         // $secret_key = "dc4aba9449e10e250ab79b6179f774b5faa27b4f"; //put your own secret_key - found in admin panel production
	     // $secret_key = "5cc4bd61a32c7fe33d3ed620ad84dcdb29a37ace"; //put your own secret_key - found in admin panel sandbox ABOF
	    
		 $return_url = "http://icp.citruspay.com/ICP_Server_testing/message.php";
		 //put your own return_url.php here.
												
		       $txn_id = time() . rand(10000,99999);
		       // $txn_id = "1138";
												
		        $value = "1.00"; //Charge amount is in INR by default
												
		  $data_string = "merchantAccessKey=" . $access_key
						. "&transactionId="  . $txn_id
						. "&amount="         . $value;
												
		    $signature = hash_hmac('sha1', $data_string, $secret_key);

		       $amount = array('value' => $value, 'currency' => 'INR');
?>
<body> 
    <!-- Page Content -->
   
           <nav class="navbar navbar-default">
			<div class="container" style="height:70px">
		  <div class="container-fluid">
			<div class="navbar-header">
			  <a class="navbar-brand" href="#">
				<img src="images/logo.png" style="width:60%">
			  </a>
			</div>
		  </div>
		  </div>
		</nav> 
		<div class="container" id="product-section">
		   <div class="row">
			   <div class="col-md-6 product-img">
					<img src="images/img1.jpg" class="img-responsive">
			   </div>
			   <div class="col-md-6">
					<h2>Red T Shirt</h2>
					<div class="product-rating"><i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star-o"></i> Rating : 4 Star	 </div>
					<hr>
					<div class="product-details">
						<div class="col-sm-4">
							<b>Manufacturer</b> :
						</div>
						<div class="col-sm-4">
							Jabza  
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
								Machine Wash as per Tag, Do not Bleach, Dry Flat, Dry in Shade, Do not Wring, Iron Steam or Dry as per Tag, Do not Iron on Print/Embroidery/Embellishment
							</div>
						 </div>
						 <div role="tabpanel" class="tab-pane top-10" id="features">
							<div class="col-sm-12">
								<ul><li>Sleeve: Half Sleeve</li>
									<li>Fabric: 100% Cotton</li>
									<li>Color:Red</li>
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
		

	<div class="clearfix"></div>
    <!-- /.container -->

        <!--<hr>
        <!-- Footer --
        <footer>
            
                <div class="col-lg-12">
                    <p>Copyright &copy; Your Website 2015</p>
                </div>
           
        </footer>-->

    <!-- /.container -->  					
	    <script src="https://code.jquery.com/jquery-2.2.2.min.js" integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI=" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
		<script>
		$(document).ready(function(){
			$('.service1-item').hover(function(){
				
			})
			
			
			$(document).ready(function() {
			  $('.service1-item img').hover(function(){
				//var idimg = $(this).attr('id');
				var srcimg = $(this).attr('src');
				//alert(srcimg);
				$('#item-display').attr("src", srcimg);
			  });
			  
			  
			});
			
		});
		</script>
</body>
</html>

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
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/shop-item.css" rel="stylesheet"> 
	<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
	<style>
/*********************************************
        		Theme Elements
*********************************************/
@import url("//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css");
.gold{
	color: #FFBF00;
}
body{font-family:Raleway}
/*********************************************
					PRODUCTS
*********************************************/

.product{
	border: 1px solid #dddddd;
	height: 321px;
}

.product>img{
	max-width: 230px;
}

.product-rating{
	font-size: 20px;
	margin-bottom: 25px;
}

.product-title{
	font-size: 20px;
}

.product-desc{
	font-size: 14px;
}

.product-price{
	font-size: 22px;
}

.product-stock{
	color: #74DF00;
	font-size: 20px;
	margin-top: 10px;
}

.product-info{
		margin-top: 50px;
}

/*********************************************
					VIEW
*********************************************/

.content-wrapper {
	//max-width: 1140px;
	background: #fff;
	margin: 0 auto;
	//margin-top: 25px;
	margin-bottom: 10px;
	border: 0px;
	border-radius: 0px;
}

.container-fluid{
	//max-width: 1140px;
	margin: 0 auto;
}

.view-wrapper {
	//float: right;
	//max-width: 70%;
	margin-top: 25px;
}

.container {
	padding-left: 0px;
	padding-right: 0px;
	max-width: 100%;
}

/*********************************************
				ITEM 
*********************************************/

.service1-items {
	padding: 0px 0 0px 0;
	float: left;
	position: relative;
	overflow: hidden;
	max-width: 100%;
	height: 321px;
	width: 130px;
}

.service1-item {
	height: 107px;
	width: 120px;
	display: block;
	float: left;
	position: relative;
	padding-right: 20px;
	border-right: 1px solid #DDD;
	border-top: 1px solid #DDD;
	border-bottom: 1px solid #DDD;
}

.service1-item > img {
	max-height: 120px;
	max-width: 119px;
	opacity: 0.6;
	transition: all .2s ease-in;
	-o-transition: all .2s ease-in;
	-moz-transition: all .2s ease-in;
	-webkit-transition: all .2s ease-in;
}

.service1-item > img:hover {
	cursor: pointer;
	opacity: 1;
}

.service-image-left {
	padding-right: 50px;
}

.service-image-right {
	padding-left: 50px;
}

.service-image-left > center > img,.service-image-right > center > img{
	//max-height: 270px;
	max-width:80%;
}
.form-control{border-radius:0px}

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
   
            <div class="col-md-6">
				<div class="content-wrapper">	
					<div class="item-container">	
						<div class="container">	
							<div class="col-md-12">
								<div class="product col-md-8 service-image-left">
								
									<center>
										<img id="item-display" src="images/img1.jpeg" alt=""></img>
									</center>
								</div>
								
								<div class="service1-items col-md-4 pull-left">
									<center>
										<a id="item-1" class="service1-item">
											<img src="images/img1.jpeg" alt=""></img>
										</a>
										<a id="item-2" class="service1-item">
											<img src="images/img2.jpeg" alt=""></img>
										</a>
										<a id="item-3" class="service1-item">
											<img src="images/img3.jpeg" alt=""></img>
										</a>
									</center>
								</div>
							</div>
								
							<div class="col-md-8" style="margin-top:30px">
								<div class="product-title">OPTIS Trendy Aviator Sunglasses</div>
								<div class="product-desc">Face Type - Oval, Frame Type - Full-frame, Polarized - No, UV Protection - 1</div>
								<div class="product-rating"><i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star-o"></i> </div>
							</div>
							<div class="col-md-4" style="margin-top:30px">
								<div class="product-price">&#8377; 1.00</div>
								<div class="product-stock">In Stock</div>
								
							</div>
							<hr>
				<!--	<div class="col-md-12">
						<hr>
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
                    <div class="row">
                        <div class="col-md-12">
                            <span class="glyphicon glyphicon-star gold"></span>
                            <span class="glyphicon glyphicon-star gold"></span>
                            <span class="glyphicon glyphicon-star gold"></span>
                            <span class="glyphicon glyphicon-star gold"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            Anonymous
                            <span class="pull-right">12 days ago</span>
                            <p>I've already ordered another one!</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <span class="glyphicon glyphicon-star gold"></span>
                            <span class="glyphicon glyphicon-star gold"></span>
                            <span class="glyphicon glyphicon-star gold"></span>
                            <span class="glyphicon glyphicon-star gold"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            Anonymous
                            <span class="pull-right">15 days ago</span>
                            <p>I've seen some better than this, but not at this price. I definitely recommend this item.</p>
                        </div>
                    </div>
							</div>-->
						</div> 
					</div>
				</div>
            </div>
            <div class="col-md-6">
                <div class="well">					
					<form class="" role="form" method="POST" action="checkout1.php" >
					<div class="col-sm-12"> 					
					    <div class="form-group col-sm-6">
						  <label for="citrusEmail" class="control-label">Email</label>
						  <div class="">
							 <input type="text" class="form-control" name="citrusEmail" value="someone@example.com"
							  placeholder="Enter Email">								 
						  </div>
					    </div>
					    <div class="form-group col-sm-6">
						  <label for="citrusMobile" class="control-label">Mobile Number</label>
						  <div class="">
							 <input type="text" class="form-control"  name="citrusMobile"
								placeholder="Enter Mobile Number" value="9876543210">								 							
						  </div>
					    </div>
						<div class="form-group col-sm-6">
						  <label for="citrusFirstName" class="control-label">First Name</label>
						  <div class="">
							 <input type="text" class="form-control" name="citrusFirstName" value="John"
								placeholder="Enter First Name">								 
						  </div>
					    </div>
						 				
					    <div class="form-group col-sm-6">
						  <label for="citrusLastName" class="control-label">Last Name</label>
						  <div class="">
							 <input type="text" class="form-control" value="Smith" name="citrusLastName"
								placeholder="Enter Last Name">								 
						  </div>
					    </div>
						 					
						<div class="form-group col-sm-12">
						  <label for="citrusStreet1" class="control-label">Address</label>
						  <div class="">
							 <textarea type="text" class="form-control" name="citrusStreet1" value="City Garden" placeholder="Enter Address line"></textarea>								 						
						  </div>
					    </div>
						 					
					    <!--<div class="form-group">
						  <label for="citrusStreet2" class="col-sm-2 control-label">Addres line 2</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusStreet2" value="Link Road"
								placeholder="Enter Address line2">								 
						  </div>
					    </div>-->
						 					
						<div class="form-group col-sm-6">
						  <label for="citrusCity" class="control-label">City</label>
						  <div class="">
							 <input type="text" class="form-control" name="citrusCity" value="Mumbai"
								placeholder="Enter City">								 
						  </div>
					    </div>
						 				
					    <div class="form-group col-sm-6">
						  <label for="citrusState" class="control-label">State</label>
						  <div class="">
							 <input type="text" class="form-control" name="citrusState" value="Maharashtra"
								placeholder="Enter State">								 
						  </div>
					    </div>
						 
						<div class="form-group col-sm-6">
						  <label for="citrusCountry" class="control-label">Country</label>
						  <div class="">
							 <input type="text" class="form-control" name="citrusCountry" value="India"
								placeholder="Enter Country">								 							
						  </div>
					    </div>
						 
					    <div class="form-group col-sm-6">
						  <label for="citrusZip" class="control-label">Zip</label>
						  <div class="">
							 <input type="text" class="form-control" name="citrusZip" value="412345"
								placeholder="Enter Zip">								 
						  </div>
					    </div>

						<input type="hidden" name="citrusSignature" value="<?php echo $signature; ?>" />
						<input type="hidden" name="citrusMerchantTxnId" value="<?php echo $txn_id; ?>"  />
						<input type="hidden" name="citrusAmount" value="<?php echo $value; ?>"  />
						
                    </div>					
					<div class="text-left">
                        <input type="submit" class="btn btn-primary" value="Place Order" />
                    </div>	
					</form>
               
                    
                </div>
            </div>

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
	    <script type="text/javascript" src= "js/jquery-1.11.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
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

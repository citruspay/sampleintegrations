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
</head>
<?php
		 // $access_key = "27AOYSJCQOR6VZ39V7JV"; //put your own access_key - found in admin panel local testopus
		 // $access_key = "SBBQ6ZMAR9NQ3KWK5B3B"; //put your own access_key - found in admin panel staging nagama 
		 // $access_key = "1TYOTI9P0VFYA179DZSY"; //put your own access_key - found in admin panel staging ravi  
		 // $access_key = "WEO99TS6PQ1ZHERXP0NZ"; //put your own access_key - found in admin panel staging citrus bank
		 // $access_key = "E5FPGJXGZR774NBYNS11"; //put your own access_key - found in admin panel sandbox mytest
		 $access_key = "18IZE4MDYJTCKUCJ3N67"; //put your own access_key - found in admin panel sandbox nagama2
		 // $access_key = "SBBQ6ZMAR9NQ3KWK5B3B"; //put your own access_key - found in admin panel sandbox nagama
		 // $access_key = "CXHXWO8HGW41HAB1LI32"; //put your own access_key - found in admin panel sandbox indiamart
		 // $access_key = "06SLEEBYLVZELISZ5ECU"; //put your own access_key - found in admin panel production shardul
		 // $access_key = "76O1QQMAXZU8SW10BO5T"; //put your own access_key - found in admin panel production l1 support
		 // $access_key = "E0127OE6C7D2KDRGW693"; //put your own access_key - found in admin panel production
		 // $access_key = "GVY0QOXF6JTR93WBFOWX"; //put your own access_key - found in admin panel sandbox ABOF
		 
		 // $secret_key = "5a1fb4e453d81782e94549087eceff67be99c1c9"; //put your own secret_key - found in admin panel local testopus
		 // $secret_key = "9cb8adb33795e35b614dc48615cd2187f23d007e"; //put your own secret_key - found in admin panel staging nagama
		 // $secret_key = "15299e935cf03bd93eaf0e7c5702367b97532185"; //put your own secret_key - found in admin panel staging ravi
		 // $secret_key = "9c350b57ebb6562adaf389972c717a33b893d4f8"; //put your own secret_key - found in admin panel staging citrus bank
         // $secret_key = "a0a7e586032ce7e98b25a65fac4335173bdf6dfa"; //put your own secret_key - found in admin panel sandbox my test
         $secret_key = "259fe54d60ff40cf244702ab62cc8befa1d3d11c"; //put your own secret_key - found in admin panel sandbox nagama2
         // $secret_key = "9cb8adb33795e35b614dc48615cd2187f23d007e"; //put your own secret_key - found in admin panel sandbox nagama
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
<body style="background-color:#f0f0f0"> 
    <!-- Page Content -->
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <div class="well" style="background-color:#ffffff">					
					<form class="form-horizontal" role="form" method="POST" action="http://localhost/Citrus.js/citrus-extras/in-browser-pay/CitrusTest-master/citrusjs_demo/checkout1.php" >
					<div class="span-12"> 					
					    <div class="form-group">
						  <label for="citrusEmail" class="col-sm-2 control-label">Email</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusEmail" value="nagama.inamdar@citruspay.com"
							  placeholder="Enter Email">								 
						  </div>
					    </div>
					    <div class="form-group">
						  <label for="citrusMobile" class="col-sm-2 control-label">Mobile Number</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control"  name="citrusMobile"
								placeholder="Enter Mobile Number" value="9876543210">								 							
						  </div>
					    </div>
						<div class="form-group">
						  <label for="citrusFirstName" class="col-sm-2 control-label">First Name</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusFirstName" value="nagama"
								placeholder="Enter First Name">								 
						  </div>
					    </div>
						 				
					    <div class="form-group">
						  <label for="citrusLastName" class="col-sm-2 control-label">Last Name</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" value="inamdar" name="citrusLastName"
								placeholder="Enter Last Name">								 
						  </div>
					    </div>
						 					
						<div class="form-group">
						  <label for="citrusStreet1" class="col-sm-2 control-label">Addres line 1</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusStreet1" value="City Garden"
								placeholder="Enter Address line1">								 						
						  </div>
					    </div>
						 					
					    <div class="form-group">
						  <label for="citrusStreet2" class="col-sm-2 control-label">Addres line 2</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusStreet2" value="Link Road"
								placeholder="Enter Address line2">								 
						  </div>
					    </div>
						 					
						<div class="form-group">
						  <label for="citrusCity" class="col-sm-2 control-label">City</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusCity" value="Pune"
								placeholder="Enter City">								 
						  </div>
					    </div>
						 				
					    <div class="form-group">
						  <label for="citrusState" class="col-sm-2 control-label">State</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusState" value="Maharashtra"
								placeholder="Enter State">								 
						  </div>
					    </div>
						 
						<div class="form-group">
						  <label for="citrusCountry" class="col-sm-2 control-label">Country</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusCountry" value="India"
								placeholder="Enter Country">								 							
						  </div>
					    </div>
						 
					    <div class="form-group">
						  <label for="citrusZip" class="col-sm-2 control-label">Zip</label>
						  <div class="col-sm-10">
							 <input type="text" class="form-control" name="citrusZip" value="412345"
								placeholder="Enter Zip">								 
						  </div>
					    </div>

						<input type="hidden" name="citrusSignature" value="<?php echo $signature; ?>" />
						<input type="hidden" name="citrusMerchantTxnId" value="<?php echo $txn_id; ?>"  />
						<input type="hidden" name="citrusAmount" value="<?php echo $value; ?>"  />
						
                    </div>					
					<div class="text-left">
                        <input type="submit" class="btn btn-success" value="Place Order" />
                    </div>	
					</form>
                    <hr>
                </div>
            </div>
        </div>
    </div>
    <!-- /.container -->
    <!-- /.container -->  					
	    <script type="text/javascript" src= "js/jquery-1.11.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
</body>
</html>
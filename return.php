  <?php
  $secret_key = "259fe54d60ff40cf244702ab62cc8befa1d3d11c";   //Sandbox nagama2
     // $secret_key = "5cc4bd61a32c7fe33d3ed620ad84dcdb29a37ace";  //Sandbox ABOF 
 
  $data =array();
  foreach ($_POST as $name => $value) {
                 $data[$name] = $value;
                 }

  //<TxId><TxStatus><amount><pgTxnNo><issuerRefNo><authIdCode><firstName><lastName><pgRespCode><addressZip>

  $verification_data =  $data['TxId']
                     . $data['TxStatus']
                     . $data['amount']
                     . $data['pgTxnNo']
                     . $data['issuerRefNo']
                     . $data['authIdCode']
                     . $data['firstName']
                     . $data['lastName']
                     . $data['pgRespCode']
                     . $data['addressZip'];
    $signature = hash_hmac('sha1', $verification_data, $secret_key);

   if ($signature == $data['signature']) 
   {
   $json_object = json_encode($data);   
   }
   else {
   $response_data = array("Error" => "Transaction Failed",
   "Reason" => "Signature Verification Failed");   
   $json_object = json_encode($response_data);
   }
   ?>

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

   <body>
       <!-- Page Content -->
       <div class="container" style="width:100%;">
           <div class="row">
               <div class="col-md-2">

               </div>
               <div class="col-md-8 well">
                 <div class="span-12 ">

                   <div class="col-sm-12">
                       <?php if($_POST['TxStatus'] === 'SUCCESS') { ?>
                           <label> Thank you for shopping with us.<br /> Your order has been placed successfully.</label>
                            <label>Below is your transaction receipt.</label><br />
                                              <div class="text-left">
                                                    <a href="https://icp.citruspay.com/Gallery/cart.php" class="btn btn-success" > Continue shopping... </a>
                                               </div>
                                               <br />
                       <?php } else { ?>
                           <label> Oops your transaction could not be completed due to <?php echo $_POST['TxStatus']; ?> </label>
                           <label>  We regret that transaction was not successful.
                                    Something went wrong and we are looking into it.
                                    (If the amount is debited from your account, Please write us with the transaction id provided below. We will initiate refund for it.)
                           </label>
                           <div class="text-left">
                               <a href="https://icp.citruspay.com/Gallery/cart.php" class="btn btn-success"> Continue shopping...</a>
                           </div>
                           <br />
                           <label>Transaction details<label>
                           <br />
                       <?php } ?>
                   </div>
                                       <?php foreach($_POST as $key => $value) { ?>
                                       <?php if($key === 'TxRefNo' || $key === 'TxId' || $key === 'paymentMode' || $key === 'txnDateTime') { ?>
               					    <div class="form-group" >
               					      <div class="col-sm-12">
               						     <label for="citrusEmail" class="col-sm-6 control-label" ><?php echo $key; ?></label>
               						     <label for="citrusEmail" class="col-sm-6 control-label" style="color:blue;"><?php echo $value; ?></label>
               						  </div>
               					    </div>
               					     <?php  } } ?>
                 </div>
               </div>
               <div class="col-md-2">
               </div>
           </div>
       </div>
       <!-- /.container -->
       <div class="container">
           <hr>
           <!-- Footer -->
           <footer>
               <div class="row">
                   <div class="col-lg-12">
                       <p>Copyright &copy; Your Website 2015</p>
                   </div>
               </div>
           </footer>
       </div>
       <!-- /.container -->
   	    <script type="text/javascript" src= "js/jquery-1.11.1.min.js"></script>
   		<script src="js/bootstrap.min.js"></script>
   </body>
   </html>

<html>
  <head>
  <script type="text/javascript">
    function postResponse(data) {
        CitrusResponse.pgResponse(data);
    }
  </script>
  </head>
  <body>
  </body>
  </html>
  <?php               
  $secret_key = "0ec3df398197aa8cd5c600c6fb1b4840895dd1db";
  $data =array();
  foreach ($_POST as $name => $value) {
                 $data[$name] = $value;
                 }
  //<TxId><TxStatus><amount><pgTxnNo><issuerRefNo><authIdCode><firstName><lastName><pgRespCode><addressZip>
  print_r("<pre>");
  print_r($_POST);
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
	print_r($verification_data);
	print_r("<br />");	
	print_r($signature);
	print_r("<br />");
	print_r($data['signature']);
	print_r("<br />");
   if ($signature == $data['signature']) 
   {
  	print_r("transaction verified");
   }
   else {
   	print_r("transaction not verified");
   }
   ?>
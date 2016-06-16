<?php

//Login function
if(isset($_POST['username']) && isset($_POST['password']))
 {getAuthToken();}
else{
	print_r("Please verify the username and password.");
}
function getAuthToken() {
	 // $clientId = "citrus-native-mobile-app-v1";
	 // $clientSecret = "83df0e4db17fa7b206f4c36d3f19d6c1";
	$clientId = "gogo-pre-wallet";
	$clientSecret = "e6f1b840c652d2ffc46530faaac8b771";

	// $data = "client_id=" . $clientId . "&client_secret=" . $clientSecret . "&grant_type=password&username=" . $_GET['username'] . "&password=" . $_GET['password'];
	$data = "client_id=". $clientId . "&client_secret=" . $clientSecret . "&grant_type=password&username=".$_POST['username']."&password=".$_POST['password'];
	//	$data = "client_id=". $clientId . "&client_secret=" . $clientSecret . "&grant_type=password&username="."testeremail@mailinator.com"."&password="."tester@123";
	// $url = "http://localhost:8080/admin-site/oauth/token";
	// $url = "https://stgadmin.citruspay.com/oauth/token";
	$url = "https://sandboxadmin.citruspay.com/oauth/token";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$output = curl_exec($ch);
	
	curl_close($ch);
	
	$token = (array)(json_decode($output));
	//invalid credentials
	if(isset($token['error'])){ print_r($output);  } 
	if (isset($token['access_token'])) {getCitrusWallet($token['access_token']);
	}
}

function getCitrusWallet($authToken) {
	//  $url = "http://localhost:8080/admin-site/service/v2/profile/me/payment";
	//  $url = "https://stgadmin.citruspay.com/service/v2/profile/me/payment";
	 $url = "https://sandboxadmin.citruspay.com/service/v2/profile/me/payment";
	//  $url = "https://sandboxadmin.citruspay.com/service/v2/mycard";
	// $url = "https://sandboxadmin.citruspay.com/service/v2/prepayment/load";
	// $data = "amount=5&redirect=http://localhost/Citrus.js/citrus-extras/in-browser-pay/merchantPageWithLoginCitrus.js/return.php&currency=INR";
	$header_data = 'Authorization: Bearer ' . $authToken;
	$headers = array();
	$headers[] = $header_data;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	// curl_setopt($ch, CURLOPT_POST, true);
	// curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$output = curl_exec($ch);
	print_r($output);	
}

?>

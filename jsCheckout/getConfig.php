 <?php

 $configArray = array();
 $configArray["OAuth"]["isSecureMerchant"] = false;
 $configArray["OAuth"]["clients"]["implicit"] = array("clientId" => "test-signup" , "clientSecret" => "c78ec84e389814a05d3ae46546d16d2e");
 $configArray["OAuth"]["clients"]["username"] = array("clientId" => "test-signin" , "clientSecret" => "52f7e15efd4208cf5345dd554443fd99");
 $configArray["Merchant"]= array("accessKey" => "06SLEEBYLVZELISZ5ECU","vanityUrl" => "testing");
   				 
 /*
		{
	OAuth: {
	    isSecureMerchant : false,
		clients: {
			implicit: {
				clientId: 'test-signup',
				clientSecret: 'c78ec84e389814a05d3ae46546d16d2e'
			},
			username: {
				clientId: 'test-signin',
				clientSecret: '52f7e15efd4208cf5345dd554443fd99'
			}
		}		 
	},
	User: {
		username: 'nagama.inamdar@citruspay.com',
		mobile: '9090909090'
	},
	Merchant: {
		accessKey: '06SLEEBYLVZELISZ5ECU',
		vanityUrl: 'testing'
	}
};
 */
  
 echo json_encode($configArray);
 
 ?>
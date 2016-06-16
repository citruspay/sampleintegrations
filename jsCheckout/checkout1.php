<?php
	error_reporting(0);
?>
<!DOCTYPE html>
<html lang="en">
	<head>	
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />		
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link href="css/font-awesome.min.css" rel="stylesheet">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
		<script>
			 dom=function(id){
			 	return document.getElementById(id);
			 }
		</script>
		<style>
			body{font-family:Raleway}
		</style>
		
	</head>
	<body style="  background-color: #f0f0f0;">
		<div style="margin-top:20px" class="spinnerDiv" >
        		<center><i class="fa fa-spinner fa-5x"></i> </center>
        	</div>
		<div class="demoBody">
<!-- ================================================= navigation =================================================== -->
			<!--unique transaction id-->
			<input type="hidden" readonly id="citrusMerchantTxnId" value="<?php echo $_POST["citrusMerchantTxnId"]; ?>" placeholder="Merchant transaction id" />
			<!-- <input type="hidden" readonly id="citrusMerchantTxnId" value="PPTX000000004974" placeholder="Merchant transaction id" /> -->
			<!--Amount-->
			<input type="hidden" readonly  id="citrusAmount" value="<?php echo $_POST["citrusAmount"]; ?>" />
			<!--Mobile number-->
			<input type="hidden" readonly id="citrusMobile" value="<?php echo $_POST["citrusMobile"]; ?>" />
			<!--First Name-->
			<input type="hidden" readonly id="citrusFirstName" value="<?php echo $_POST["citrusFirstName"]; ?>" />
			<!--Last Name-->
			<input type="hidden" readonly id="citrusLastName" value="<?php echo $_POST["citrusLastName"]; ?>" />
			<!--Street1-->
			<input type="hidden" readonly id="citrusStreet1" value="<?php echo $_POST["citrusStreet1"]; ?>" />
			<!--Street2-->
			<input type="hidden" readonly id="citrusStreet2" value="<?php echo $_POST["citrusStreet2"]; ?>"/>
			<!--City-->
			<input type="hidden" readonly id="citrusCity" value="<?php echo $_POST["citrusCity"]; ?>"/>
			<!--State-->
			<input type="hidden" readonly id="citrusState" value="<?php echo $_POST["citrusState"]; ?>"/>
			<!--Country-->
			<input type="hidden" readonly id="citrusCountry" value="<?php echo $_POST["citrusCountry"]; ?>"/>
			<!--Zip-->
			<input type="hidden" readonly id="citrusZip" value="<?php echo $_POST["citrusZip"]; ?>"/>
			<!--Signature -->
			<input type="hidden" readonly id='citrusSignature' value="<?php echo $_POST["citrusSignature"]; ?>"  />
			<!-- <input type="hidden" readonly id='citrusSignature' value="7a0d4520f3984e92b3bfbf6972d5787f360c3e93"  /> -->
			<!--Return Url-->
			<input type="hidden" readonly id="citrusReturnUrl" value="https://icp.citruspay.com/Gallery/return.php" />
			<!-- <input type="hidden" readonly id="citrusReturnUrl" value="https://stgadmin.citruspay.com/service/v2/prepayment/load/complete"  /> -->
			
			<input type="hidden" id="citrusCustomParamCount" value="1"  />
			<!--Custom parameter Name-->
			<input type="hidden" id="citrusCustomParamsName1" value="productName"  />
			<!--Custom parameter value-->
			<input type="hidden" id="citrusCustomParamsValue1" value="123"  />
						 
<!-- ================================================= navigation Tabs=================================================== -->
			
			<div class="section" style="  background-color: #fff; border-radius: 3px; box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.25);">
			
			<div class="nav" style="z-index:99;margin-left:115px" >
				<a  id="tb1" style="display:block;float:left">
					<span  onclick="selectedPG('SavedPaymentMode',1)" id="box1" style="background:#6b6661;cursor:pointer;" >
						<i id="circ1" style="display:none;" class="fa fa-circle-o fa-1x checked"  ></i>
						<i id="chck1" style="color:white;"  class="fa fa-check-circle fa-1x checked"></i>
						<i  id="itm1"  style="color:white;"  class="fa fa-money fa-2x"></i>
					</span>
					<p  style="color:black;font-size:16px;margin-top:10px" id="txt1">Citrus Wallet</p>
				</a>
				<a  id="tb2"  style="display:block;float:left">
					<span onclick="selectedPG('CDPaymentMode',2)" id="box2" style="background:white;cursor:pointer;" >
						<i id="circ2"  class="fa fa-circle-o fa-1x checked"  id="tb2" ></i>
						<i id="chck2" style="color:white;" style="display:none;" class="fa fa-check-circle fa-1x checked"></i>
						<i  id="itm2"   class="fa fa-credit-card fa-2x"></i>
					</span>
					<p id="txt2" style="color:black;font-size:16px;margin-top:10px">Card Payment</p>
				</a>
				<a  id="tb3" style="display:block;float:left">
					<span onclick="selectedPG('NetBankingPaymentMode',3)" id="box3" style="background:white;cursor:pointer;" >
						<i id="circ3"  class="fa fa-circle-o fa-1x checked"></i>
						<i id="chck3" style="color:white;" style="display:none;" class="fa fa-check-circle fa-1x checked"></i>
						<i  id="itm3" class="fa fa-university fa-2x"></i>
					</span>
					<p id="txt3" style="color:black;font-size:16px;margin-top:10px">Net Banking</p>
				</a>
			</div>
			<div class="select_payment">
				Select Payment Mode	
			</div>	
<!-- ================================================= saved Account ================================================ -->
				<div id="SavedPaymentMode" class="pg" style="position:relative;top:15%;">
					<!--<form id="loginForm" class="form form-vertical" role="form" style="margin-top: 110px;" >	-->
						<div id="Members_section" style="display:block;  margin-top: 80px;" class="CreditDebitCard" >
							<h3 id="loginErrorMessage" class="failedError" style="margin: 4px; color:#810E03; display:none" >Please verify the username and password.</h3>
							<label for="citrusEmail" >E-Mail</label>
							<div class="input-group">
								<i class=" fa fa-at input-group-addon"></i>
								<input placeholder="E-Mail" id="citrusEmail" type="text" style="border-radius: 0 5px 5px 0; "  value="<?php echo $_POST['citrusEmail']; ?>" />
								<main id="errorIncorrectEmail" class="Citrus_Members_Errors" style="display:none" >The email you entered is Incorrect</main>
							</div>
							<label for="citrusEmail" style="padding-top: 10px;" >Password</label>
							<div class="input-group" style="margin: 4px 0px;">
								<i class=" fa fa-lock input-group-addon"></i>
								<input placeholder="Password" id="citrusPassword" style="border-radius: 0 5px 5px 0;" type="password"/>
								<main id="errorIncorrectEmailPassword" class="Citrus_Members_Errors" style="display:none" >The password you entered is Incorrect</main>
							</div>
							<div class="btnFooter" >
								<button class="btn-lg" id="citrusLoginButton" style="width:300px; margin-top: -10px; box-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);">
									<i class=" fa fa-lock"></i> &nbsp;&nbsp; Login
								</button>
							</div>
                        </div>
                    <!-- </form> -->
                <div id="Wallet_section" style="display:none;position:relative;top:32%;" >
					<div class="savedAccounts" style=" margin-top: 100px;">
						<ul id="walletData">

						</ul>
					</div>					
					<div style="margin-top:25px; text-align:center;" class="walletButtonDiv">
						<button class="btn-lg walletBtn" id="" style="width:300px; box-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);">
							<i class=" fa fa-lock"></i> &nbsp;&nbsp;Pay Using Wallet
						</button>
					</div>
				</div>

				</div>
<!-- ================================================= Credit/Debit Card ============================================ -->
				<div id="CDPaymentMode" class="pg" style="display:none;">
					<div class="CreditDebitCard" id="creditInner" style="margin-top:90px">
					<div style="padding-top:74px"></div>
					<div id="creditDebitForm" class="form form-vertical" role="form" style="margin-top:20px">
					
						<div class="SelectBox" style="  margin-top: -10px; display: inline-block; width: 50%;">
							<select id="citrusCardType" style="width:245px" class="">
								<option value="credit">Credit</option>
								<option value="debit">Debit</option>
							</select>
							<!---<select id="citrusScheme" style="width:100px" class="half-section sm-txt">

                            </select>--->
							<input type="hidden" id="citrusScheme" />
						</div>
						<div style="display: inline-block;  width: 34%;  margin-left: 77px;">
													</div>
						<label for="citrusEmail">Card Number</label>
						<div class="input-group" style="margin: 4px 0px;">
							<i class=" fa fa-credit-card fa-1x input-group-addon"></i><input id="citrusNumber" type="text" placeholder="Card Number" />
						</div>
						
						<div style="display:inline-block">
						<div style="display: inline-block;  width: 50%; margin-top: 5px;">
							<label for="citrusEmail">Expiry Date</label>
							<div class="ExpCvv input-group" style="margin-top: 5px;">
								<i class=" fa fa-clock-o fa-1x input-group-addon"></i><input id="citrusExpiry" type="text" placeholder="MM/YY" style="width:210px; margin-right:25px; display:inline-block;"/>
							</div>
						</div>
						<div style="display: inline-block; width: 43%; margin-left: 35px;">
							<label for="citrusEmail">CVV</label>
							<div class="ExpCvv input-group" style="margin-top: 5px;">
								<i class=" fa fa-lock fa-1x input-group-addon"></i><input id="citrusCvv" type="password" placeholder="CVV" style="width:210px; display:inline-block;">
							</div>
						</div>
						
						<label for="citrusEmail">Card Name</label>
						<div class="input-group" style="margin: 4px 0px;">
							<i class=" fa fa-user fa-1x input-group-addon"></i><input id="citrusCardHolder" type="text" placeholder="Name On Card" style="width:534px;"  />
						</div>
						<div style="margin-top:25px; text-align:center;">
							<button class="btn-lg walletBtn" id="citrusCardPayButton" value="Pay Now" style="width:300px; box-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);">
								<i class=" fa fa-lock"></i> &nbsp;&nbsp;Pay INR <?php echo $_POST['citrusAmount']; ?>
							</button>
						</div>
						</div>
					</div>
				</div>
			</div>
<!-- ================================================= Net Banking ================================================== -->
				<div id="NetBankingPaymentMode" class="pg" style="display:none; position:relative; top:30%; text-align: center;">
					<div class="SelectBox">
						
						<select id="citrusAvailableOptions" >
							<option>Select Bank</option>								
						</select>
						<div style="margin-top:25px; text-align:center;">
							<button  class="btn-lg walletBtn" id="citrusNetbankingButton" style="width:300px; box-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);">
								<i class=" fa fa-lock"></i>&nbsp;&nbsp;Pay INR <?php echo $_POST['citrusAmount']; ?>
							</button>
						</div>
					</div>
				</div>
<!-- ================================================= Citrus Bank ================================================== -->
                				<div id="CitrusBankPaymentMode" class="pg" style="display:none;">
                                					<div class="CreditDebitCard">
                                						<input id="citrusPrepaidCardHolder" type="text" placeholder="Prepaid Card Holder Name">
                                						<div style="margin:20px 0;">
                                							<button id="citrusCashPayButton" value="Pay Now">
                                								<span>Pay INR <?php echo $_POST['citrusAmount']; ?></span>
                                							</button>
                                						</div>
                                					</div>
                                </div>

			</div>
		<div class="footerContent" style="text-align:right;">
			<img style="  margin-top: -73px; width: 170px;" src="images/security_icon.png">
			<img style="  margin-top: -73px; width: 80px;margin-right:10px;" src="images/geotrust_logo.png">
		</div>
		<!--<div style="display: inline-block;  width: 34%;  margin-left: 11px;margin-top: -62px;position: absolute;">
							<i class=" fa fa-lock fa-2x"></i>&nbsp;&nbsp;<p style="display: inline-block;color: #555555;margin-top: 7px;position: absolute;font-weight: bold;font-size: 14px;color: #f7941e;font-weight: bold;">Secured with Citrus</p>
<p style=" color: red; font-size: 14px; margin-top: -50px; margin-left: 190px;text-align: center;" id="citrusErrorMessage"> </p>
						</div>-->
		</div>

		<script src="js/jquery-1.11.1.min.js"></script>		
		<script src="js/citrus.js" > </script>
		<script src="js/checkout.js" > </script>
		<script type="text/javascript" src="js/config.js" > </script>
		<script type="text/javascript" src="js/jquery.payment.js"> </script>
		<script>
		    $(".spinnerDiv").css("display","block");
/*........................................... select tabs...........................................*/
			function selectedPG(val,tab){
				 
				for( i =1 ; i<4;i++){
					change(i,tab);
				}

				$(".pg").hide();
				$("#"+val).show();
				$("#citrusErrorMessage").html("");

			}
			function change(i,tab){

				if(i!=tab){				        			
						dom("circ" + i).style.display='block';
						dom("chck" + i).style.display='none';
						dom("box" + i).style.background='white';
						dom("itm"+i).style.color="#666666";	
						dom("txt"+i).style.color="#666666";					
					}
					else{											
						dom("circ" + i).style.display='none';
						dom("chck" + i).style.display='block';
						dom("box" + i).style.background='#6b6661';
						dom("itm"+i).style.color="white";
						dom("txt"+i).style.color="balck";		
					}
			}
/*............................................script for all Payment .......................................*/
					//Library Error log functions
        			function citrusServerErrorMsg(errorResponse) {
        				console.log("here in citrus server error message"); 
        				$(".spinnerDiv").css("display","none");
        				if(errorResponse.txMsg !== undefined && errorResponse.txMsg !== null)
        				{$("#citrusErrorMessage").html(errorResponse.txMsg);}
        				else
        				{$("#citrusErrorMessage").html(errorResponse);}
        			}
        			function citrusClientErrMsg(errorResponse) {
        				$(".spinnerDiv").css("display","none");
        				$("#citrusErrorMessage").html(errorResponse);
        			}        			
        			//fetch the payment options
                    fetchPaymentOptions();
                    // get pg health
                    getPGhealth();
/*............................................Fetch Wallet................................................................*/
		$("#citrusLoginButton").on("click", function(event){	
			$(".spinnerDiv").css("display","block");		
			 var email = jQuery("#citrusEmail").val();
			 var password = jQuery("#citrusPassword").val();
                 event.preventDefault();     
		       jQuery.ajax({
				type : 'POST',
				url : "loginService.php", 				 				
				data : {username : email, password : password},   
				success : function(response) {
					response = JSON.parse(response);				   
					if(response.error) 
					{
						$(".spinnerDiv").css("display","none");
						$("#citrusErrorMessage").html("Please verify the username and password.");
					 }
				    	else{response = response.paymentOptions;				 
					handleCitrusWallet(response);										 
					}
				},
				error : function(err) {
					console.log("Error in making request");					
				}
			});		       		       		       			
		});
/*............................................Credit/Debit Guest checkout Payment .......................................*/
/* event on credit/debit button ------->                                                                                 */				
			$("#citrusCardPayButton").on("click", function(){try { makePayment("card")}catch(e){console.log(e);}});
			$("#citrusCashPayButton").on("click", function(){makePayment("citrusbanking")});
/*............................................Payment Options  & Citrus wallet ............................................*/
			//Merchants have to customize this function implementation in order to generate the UI of NetBanking DropDown &  Citrus wallet options
			function handleCitrusPaymentOptions(citrusPaymentOptions) {
			$(".spinnerDiv").css("display","none");
			$("#citrusErrorMessage").html("");
				var optionString = "<option selected disabled>Select bank</option>";
                				var netbankingOptions = citrusPaymentOptions.netBanking;
                				for (var key in netbankingOptions) {
                					var obj = netbankingOptions[key];
                					optionString +=  '<option value ="' + obj.issuerCode + '">' + obj.bankName + '</option>';
                				}
                jQuery('#citrusAvailableOptions').html(optionString);
			}
			function handlePGhealthResponse(resp){				
				var pgHealthString = "";		
				$.each( resp, function( key, value ) {
					if(value<50)
					{
					switch(key)
					{
						case "CID002" : pgHealthString += " Axis Bank";
										break;
						case "CID005" : pgHealthString += " SBI Bank";
										break;
						case "CID012" : pgHealthString += " SBH Bank";
										break;
						case "CID001" : pgHealthString += " ICICI Bank";
										break;
						case "CID010" : pgHealthString += " HDFC Bank";
										break;
						case "CID033" : pgHealthString += " Kotak Mahindra Bank";
										break;
						case "CID027" : pgHealthString += " Indian Overseas Bank";
										break;
						case "CID008" : pgHealthString += " Indian Bank";
										break;												
					}	
					}				  				
				});		
					$("#pgHealthResponse").html(pgHealthString + " seems to be down for a while.");		
			}
			function handleCitrusWallet(citrusWalletresponse){
				$(".spinnerDiv").css("display","none");
				$("#citrusErrorMessage").html("");
				
			//start implementing citrus wallet				
			var wallet = "";
			var len = citrusWalletresponse.length;
			if(len>0){
				//Please iterate through the entire array using following code snippet
				for (var i=0,len=citrusWalletresponse.length;i<len;i++)
				{
				  //code to render the citrus wallet
				  if(citrusWalletresponse[i] !== undefined && citrusWalletresponse[i] !== null)
				  {
					if(citrusWalletresponse[i].type == "credit" || citrusWalletresponse[i].type == "debit")
					{
						if(citrusWalletresponse[i].scheme === "amex")
						{
						 var cvvLength = 4;
						}else{
						var cvvLength = 3;
						}
						wallet +=
							'<li>' +
							'	<input type="radio" value="' + i + '&' + citrusWalletresponse[i].token + '" name="CitrusWalletPaymentOption" class="savedAccountsRadio cardPayments" onclick="selectPaymentOption(this)" >' +
							'	<img class="savedAccountsImg" src="images/' + citrusWalletresponse[i].scheme + '.png" >' +
							'	<span class="savedAccountsCard" for="citrusPaymentOptionToken">' + citrusWalletresponse[i].number + '</span>' +
							'	<label>' +
							'		<input type="password" class="password savedAccountsCvv" maxlength="' + cvvLength + '" placeholder="CVV" id="CitrusMembercvv'+ i +'" required="required">' +
							'	<label>' +
							'</li>';
					}else{
						wallet +=
							'<li>' +
							'	<input type="radio" value="' + citrusWalletresponse[i].token + '" name="CitrusWalletPaymentOption" class="savedAccountsRadio NetBankingPayments" onclick="selectPaymentOption(this)">'+
							'	<img class="savedAccountsImg" src="images/NetBanking.png" > ' +
							'	<span class="savedAccountsCard" for="citrusPaymentOptionToken">' + citrusWalletresponse[i].name.split(" - ")[1] + '</span>'+
							'</li>';
					}
				  }
				}
				$("#Members_section").css("display","none");
				$("#Wallet_section").css("display","block");
				$("#walletData").html(wallet);
				
                //end of citrus wallet
				}else{
					$("#walletTab").css("display","none");
                    $("#SavedPaymentMode").css("display","none");
				    $("#CDPaymentMode").css("display","block");
				   
				}
			}
/*........................................Event on NetBanking button .....................................*/
				$('#citrusNetbankingButton').on("click", function(){makePayment("netbanking")});
/*............................................Citrus wallet Payment .......................................*/
			function selectPaymentOption(elem){
				if( $(elem).hasClass( "cardPayments" )){
					$(".walletBtn").prop("id","citrusWalletCardPayButton");
				}
				else{
					$(".walletBtn").prop("id","citrusWalletNetbankingButton");
				}
/*...........................................event on Citrus wallet ........................................*/
				$("#citrusWalletCardPayButton").on("click",function(){makePayment("card",true)});
				$("#citrusWalletNetbankingButton").on("click",function(){makePayment("netbanking",true)});			
			}
		</script>
	</body>
</html>

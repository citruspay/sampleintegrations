var CitrusPay = {};
jQuery.support.cors = true;
CitrusPay.Merchant = {};
CitrusPay.Config = ( function() {
		var ua = navigator.userAgent;      				    
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");    	      		    
        if (/MSIE (\d+\.\d+);/.test(ua) && parseFloat( RegExp.$1 ) < 10 )  
        {        	   	                                            
            var environments = {
			DEBUG : 'DEBUG',
			TEST : 'TEST',
			STAGING : 'STAGING',
			SANDBOX : 'SANDBOX',
			PRODUCTION : 'PRODUCTION',
			LOCAL : 'LOCAL'
		},
		    servers = {
			TEST : 'https://test.citruspay.com/',
			DEBUG : '/citruscors/',
			STAGING : 'https://oops.citruspay.com/',
			PRODUCTION : '/citruscors/',
			LOCAL : 'http://localhost:8080/admin-site/'
		},
		    paymentModes = {
			CREDIT_CARD : 'CREDIT_CARD',
			DEBIT_CARD : 'DEBIT_CARD',
			NET_BANKING : 'NET_BANKING',
			PREPAID_CARD : 'PREPAID_CARD',
			IMPS : 'IMPS'
		},
		    V2Servers = {
			TEST : 'https://test.citruspay.com/',
			DEBUG : 'https://sandbox.citruspay.com/sslperf/',
			STAGING : 'https://oops.citruspay.com/sslperf/',
			PRODUCTION : 'https://www.citruspay.com/',
			LOCAL : 'http://localhost:8080/admin-site/sslperf/'
		};	
        }   
		else{			
			var environments = {
			DEBUG : 'DEBUG',
			TEST : 'TEST',
			STAGING : 'STAGING',
			SANDBOX : 'SANDBOX',
			PRODUCTION : 'PRODUCTION',
			LOCAL : 'LOCAL'
		},
		    servers = {
			TEST : 'https://test.citruspay.com/',
			DEBUG : 'https://sandboxadmin.citruspay.com/',
			STAGING : 'https://stg4admin.citruspay.com/',
			PRODUCTION : 'https://admin.citruspay.com/',
			LOCAL : 'http://localhost:8080/admin-site/',
			POWER : 'https://poweradmin.citruspay.com/'
		},
		    paymentModes = {
			CREDIT_CARD : 'CREDIT_CARD',
			DEBIT_CARD : 'DEBIT_CARD',
			NET_BANKING : 'NET_BANKING',
			PREPAID_CARD : 'PREPAID_CARD',
			IMPS : 'IMPS'
		},
		    V2Servers = {
			TEST : 'https://test.citruspay.com/',
			DEBUG : 'https://sandbox.citruspay.com/',
			STAGING : 'https://stg4.citruspay.com/',
			PRODUCTION : 'https://www.citruspay.com/',
			LOCAL : 'http://localhost:8080/admin-site/sslperf/',
			POWER : 'https://power.citruspay.com/'
		},
		dpServers = {
			TEST : 'https://test.citruspay.com/dynamic-pricing',
			DEBUG : 'https://sandboxmars.citruspay.com/dynamic-pricing',
			STAGING : 'https://stg4admin.citruspay.com/dynamic-pricing',
			PRODUCTION : 'https://mars.citruspay.com/dynamicpricing',
			LOCAL : 'http://localhost:8080/admin-site/dynamic-pricing',
			POWER : 'https://poweradmin.citruspay.com/dynamic-pricing'
		};
		emiServers = {
			TEST : 'https://test.citruspay.com/emi-service/emi/',
			DEBUG : 'https://sandboxmars.citruspay.com/emi-service/emi/',
			STAGING : 'https://stg4.citruspay.com/emi-service/emi/',
			PRODUCTION : 'https://mars.citruspay.com/emi-service/emi/',
			LOCAL : 'http://localhost:8080/admin-site/emi-service/emi/',
			POWER : 'https://poweradmin.citruspay.com/emi-service/emi/'
		};	
		vaultServers = {
			TEST:"",
			DEBUG:"https://vault.test.citruspay.com/",
			STAGING:"",
			PRODUCTION:"",
			LOCAL:"",
			POWER:""
		};											
		}		                
		  env = environments.DEBUG;
		v2Env = V2Servers.DEBUG;	
		dpEnv = dpServers.DEBUG;
	 vaultEnv = vaultServers.DEBUG; 
	    function getEnv() {
			return env;
		}

		function setEnv(environment) {
			if (environments[environment]) {
				  env = environment;
				v2Env = environment;
				dpEnv = environment;
			 vaultEnv = environment;
			} else {
				  env = environments.DEBUG;
				v2Env = V2Servers.DEBUG;
				dpEnv = dpServers.DEBUG;
			 vaultEnv = vaultServers.DEBUG;				
				citrusClientErrMsg("Invalid Environment specified: " + env);
				throw new Error("Invalid Environment specified: " + env);
			}
		}

		function getServer() {
			return servers[env];
		}

		function getV2Server() {
			return V2Servers[env];
		}
		
		function getDpServer() {
			return dpServers[env];
		}
		
		function getEmiServer() {
			return emiServers[env];
		}
		
		function getVaultServer() {
			return vaultServers[env];
		}

		return {
			PaymentModes : paymentModes,
			Env : environments,
			getServer : getServer,
			getEnv : getEnv,
			setEnv : setEnv,
			getV2Server : getV2Server,
			getDpServer : getDpServer,
			getEmiServer : getEmiServer,
			getVaultServer : getVaultServer
		};
	}());
CitrusPay.Scheme = {};
CitrusPay.Scheme.Config = {
	credit : [],
	debit : []
};
CitrusPay.Scheme.Model = {};
CitrusPay.Scheme.Model.ReformatScheme = function(data) {
	switch (data) {
	case 'visa':
		return 'VISA';
	case 'mastercard' :
	case 'master card' :
		return 'MCRD';
	case 'maestro':
	case 'maestro card' :
		return 'MTRO';
	case 'amex':
		return 'AMEX';
	case 'dinersclub' :
	case 'diners club':
		return 'DINERS';
	case 'master card' :
		return 'MCRD';
	case 'rupay' :
		return 'RPAY';
	}
	return data;
};
CitrusPay.Validators = ( function() {
		"use strict";
		var regExp = {
			Address : /^[\s\S]{1,255}$/,
			BankId : /^[1-9][0-9]*$/, 
			CardNumber : /^[0-9]{15,19}$/,
			CardType : /^[\s\S]{1,255}$/,
			City : /^[\s\S]{1,100}$/,
			Country : /^[\s\S]{1,100}$/,
			CustomParam : /^[0-9a-zA-Z ]{1,20}$/,
			CVV : /^[0-9]{3,4}$/,
			'4DBC' : /^[0-9]{4}$/,
			Email : /^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/,
			Mobile : /^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/,
			MonthNum : /^([0-9])|1[0-1]$/,
			Name : /^(?!\s*$)[a-zA-Z .]{1,50}$/,
			Password : /^(?=.*\d)(?=.*[A-Za-z])(?=.*[A-Za-z!@#$%^&*]).{8,16}/,
			PinCode : /^(?!\s*$)[a-zA-Z0-9\-, .] ?([a-zA-Z0-9\-, .]|[a-zA-Z0-9\-, .] )*[a-zA-Z0-9\-, .]{1,7}$/,
			State : /^[\s\S]{1,100}$/,
			YearNum : /^20[1-9][0-9]$/,
			Boolean : /^true|false$/,
			URL : /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
			MMID : /^(?!0)[a-zA-Z0-9]{7}$/,
			Mobile10D : /^(?!0)[0-9]{10}$/,
			OTP : /^(?!0)[0-9]{6}$/
		};
		function regularExpressionValidatorWrapper(optional) {
			return function regularExpressionValidator(value, type, name) {
				name = name ? name + ': ' : '';
				var re = regExp[type];
				console.log(value);
				if ((value !== null && value !== undefined && value !== "") || !optional) {
					if (!re.test(value)) {
						console.log(value);
						citrusClientErrMsg("Invalid value: " + value + " for type: " + type + ".");
						throw new Error(name + "Invalid value: " + value + " for type: " + type + ".");
					}
				}
			};
		}

		function requiredValidator(value, name) {
			var field = name;
			name = name ? name + ': ' : '';
			if (!value && value !== 0 && value !== false) {
				citrusClientErrMsg(field + " is required.");				
			}
		}

		function numberValidator(value, name) {
			name = name ? name + ': ' : '';
			if (value !== 0 && (!value || typeof value === 'number')) {
				citrusClientErrMsg(name + "Invalid number: " + value + ".");				
			}
		}

		function allwoedValuesValidator(value, allowedValues, name) {
			name = name ? name + ': ' : '';
			if (allowedValues.indexOf(value) === -1) {
				citrusClientErrMsg(name + "Invalid value. Possible values are: " + allowedValues.toString());
				throw new Error(name + "Invalid value. Possible values are: " + allowedValues.toString());
			}
		}

		function dateValidator(value, name) {

			var today = new Date();
			var month = today.getMonth() + 1;
			
			var expiry = value.replace(/\s+/g, '').replace("/", "");
			var inputMonth = expiry.substr(0, 2);
			var inputYear=expiry.slice(-4);
			var len = expiry.length;
			var year = today.getFullYear().toString().slice(-4);
			
			 if (len == 6) {
				 if (!(((inputMonth < month && inputYear > year) || (inputMonth >= month && inputYear >= year)) && inputMonth <= 12 && inputYear<=(parseInt(year)+50).toString())) {            
			     citrusClientErrMsg("Invalid date: " + value);
			     	throw new Error(name + "Invalid date: " + value + ".");
			    }


			 }
			 else {
			 	citrusClientErrMsg("Invalid date: " + value);
			 	throw new Error(name + "Invalid date: " + value + ".");
			 }
		}

		function cardNumberValidator(number, type, name) {
			var cardNum = number.replace(/\s+/g, '');
			if (jQuery.payment.validateCardNumber(cardNum) === true) {

			} else {
				citrusClientErrMsg("Invalid card number: ");
				throw new Error(name + "Invalid card number: " + number + ".");
			}
		}

		function schemeValidator(scheme, cardType) {			
			switch (cardType) {
			case 'credit' :
				if (jQuery.inArray(scheme, CitrusPay.Scheme.Config.credit) === -1) {
					citrusClientErrMsg(scheme + " Scheme is not available for : " + cardType + " card");
					throw new Error(scheme + " Scheme is not available for : " + cardType + " card");
				}
				break;
			case 'debit' :
				if (jQuery.inArray(scheme, CitrusPay.Scheme.Config.debit) === -1) {
					citrusClientErrMsg(scheme + " Scheme is not available for : " + cardType + " card");
					throw new Error(scheme + " Scheme is not available for : " + cardType + " card");
				}
				break;
			}
		}

		return {
			RequiredValidator : requiredValidator,
			RegularExpressionValidator : regularExpressionValidatorWrapper(false),
			OptionalRegularExpressionValidator : regularExpressionValidatorWrapper(true),
			NumberValidator : numberValidator,
			AllowedValuesValidator : allwoedValuesValidator,
			DateValidator : dateValidator,
			CardNumberValidator : cardNumberValidator,
			SchemeValidator : schemeValidator
		};
	}());
CitrusPay.Rest = {};
CitrusPay.Rest.Payment = {};
CitrusPay.Rest.Payment.Config = ( function() {
	}());
CitrusPay.Rest.Payment.Model = ( function() {
		function Amount(data) {
			return {
				currency : data.currency || 'INR',
				value : data.value || ''
			};
		}
		return {
			Amount : Amount
		};
	}());
CitrusPay.Rest.Payment.Validators = ( function() {
		function validateAmount(data) {
			CitrusPay.Validators.RequiredValidator(data, "Amount value");
			CitrusPay.Validators.NumberValidator(data, "Amount value");
		}

		return {
			AmountValidator : validateAmount
		};
	}());
CitrusPay.Rest.Merchant = {};
CitrusPay.Rest.Merchant.Config = ( function() {
		var settingUrl = 'service/v1/merchant/pgsetting';		
		function getTokenUrl() {
			return CitrusPay.Config.getServer() + settingUrl;
		}
		
		function getPgHealthUrl(vanityUrl) {
			return CitrusPay.Config.getV2Server() + 'utility/' + vanityUrl + '/pgHealth';
		}
		
		return {
			getTokenUrl : getTokenUrl,
			getPgHealthUrl : getPgHealthUrl
		};
	}());
CitrusPay.Rest.Merchant.Service = ( function() {
		function getPaymentOption(vanityurl, cb, cbError) {
			jQuery.ajax({
				type : 'POST',				
				url : CitrusPay.Rest.Merchant.Config.getTokenUrl(),
				contentType : 'application/x-www-form-urlencoded',
				data : {
					'vanity' : vanityurl
				},
				success : function(response) {					
					cb ? cb(response) : '';
				},
				error : function(error) {
					cbError ? cbError() : '';
				}
			});
		}
				
		function getPgHealth(vanityUrl, cb, cbError) {
			jQuery.ajax({
				type : 'POST',				
				url : CitrusPay.Rest.Merchant.Config.getPgHealthUrl(vanityUrl),
				data : {
					bankCode : "ALLBANKS"			
				},
				success : function(response) {
				var flag = isJSON(response);
  				if(flag === true) 
  	    		{ response = JSON.parse(response);  }
					cb ? cb(response) : '';
				},
				error : function(error) {
					console.log("Error");					
					cbError ? cbError() : '';
				}
			});
		}
		
		return {
			getPaymentOption : getPaymentOption,
			getPgHealth : getPgHealth
		};
	}());
CitrusPay.Rest.Merchant.API = ( function() {
		function getavailablePaymentOptions(vanityUrl, cb, cbErr) {
			CitrusPay.Rest.Merchant.Service.getPaymentOption(vanityUrl, cb, cbErr);
		}
		function getPgHealth(vanityUrl, cb,cbErr){
			CitrusPay.Rest.Merchant.Service.getPgHealth(vanityUrl, cb, cbErr);
		} 
		return {
			getavailablePaymentOptions : getavailablePaymentOptions,
			getPgHealth : getPgHealth			
		};
	}());
CitrusPay.Rest.Payment.Payment = {};
CitrusPay.Rest.Payment.Payment.Config = ( function() {
		urls = {
			moto : {
				struct : 'service/moto/authorize/struct/',
				unstruct : 'service/moto/authorize/'
			}
		};
		function getUrl(type) {
			type = type.split(".");
        var urlExt = urls;
        urlExt = urlExt[type[0]];

        if (type.length == 1)
            urlExt = urlExt[type[0]];
        else if (type.length == 2)
            urlExt = urlExt[type[1]];

        return CitrusPay.Config.getServer() + urlExt;
		}

		return {
			getUrl : getUrl
		};
	}());
CitrusPay.Rest.Payment.Payment.Model = {};
CitrusPay.Rest.Payment.Payment.Model.PaymentRequest = function(data) {
	return {
		merchantTxnId : data.merchantTxnId || '',
		amount : data.amount || CitrusPay.Rest.Payment.Model.Amount(),
		userDetails : data.userDetails || CitrusPay.Rest.Payment.Payment.Model.UserDetails(),
		returnUrl : data.returnUrl || '',		
		paymentToken : data.paymentToken || CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionIdToken(),
		notifyUrl : data.notifyUrl || '',
		merchantAccessKey : data.merchantAccessKey || '',
		requestSignature : data.requestSignature || ''
	};
};
CitrusPay.Rest.Payment.Payment.Model.UserDetails = function(data) {
	return {
		email : data.email || '',
		firstName : data.firstName || '',
		lastName : data.lastName || '',
		address : data.address || CitrusPay.Rest.Payment.Payment.Model.Address(),
		mobileNo : data.mobileNo || ''
	};
};
CitrusPay.Rest.Payment.Payment.Model.Address = function(data) {
	return {
		street1 : data.street1 || 'NA',
		street2 : data.street2 || 'NA',
		city : data.city || 'NA',
		state : data.state || 'NA',
		country : data.country || 'NA',
		zip : data.zip || 'NA'
	};
};
CitrusPay.Rest.Payment.Payment.Model.PaymentToken = ( function() {
		function PaymentOptionIdToken(data) {
			return {
				type : 'paymentOptionIdToken',
				id : data.id || '',
				cvv : data.cvv || ''
			};
		}

		function PaymentOptionToken(data) {
			return {
				type : 'paymentOptionToken',
				paymentMode : data.paymentMode || CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.CreditCard()
			};
		}

		function MemberPaymentOptionToken(data) {
			return {
				type : 'paymentOptionIdToken',
				id : data.id				
			};
		}

		return {
			PaymentOptionIdToken : PaymentOptionIdToken,
			PaymentOptionToken : PaymentOptionToken,
			MemberPaymentOptionToken : MemberPaymentOptionToken
		};
	}());
CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment = ( function() {
		function NetBanking(data) {
			return {
				type : 'netbanking',
				bank : data.bank || '',
				code : data.code || ''
			};
		}
		function PaymentCard(type) {
			return function(data) {
				if(data.expiry)
 			{	d=data.expiry.slice(3);
 				if(d.length==2){
 					var today = new Date();
 					var year = today.getFullYear().toString().slice(0,2);
 					data.expiry=data.expiry.toString().slice(0,3)+year+d; 					
 				}
 			}	 				
				return {					
					type : type,
					scheme : data.scheme || '',
					number : data.number || '',
					holder : data.holder || '',
					expiry : data.expiry || '',
					cvv : data.cvv || ''
				};
			};
		}
		
		function PaymentInfo(type){			
			return function(data) {				
					return {								
    					cardNo : data.cardNo || '',
    					cardType : data.cardType || '',
    					issuerId : data.issuerId ||'',
    					paymentMode : type,
    					paymentToken : data.paymentToken||''    								
				  };
				  };			
		}

		return {
			NetBanking : NetBanking,
			CreditCard : PaymentCard('credit'),
			EmiCreditCard : PaymentCard('emi'),
			DebitCard : PaymentCard('debit'),
			PrepaidCard : PaymentCard('prepaid'),
			PaymentInfo : PaymentInfo('CITRUS_WALLET'),
			PaymentInfo : PaymentInfo('PREPAID_CARD'),
			PaymentInfo : PaymentInfo('CREDIT_CARD'),
			PaymentInfo : PaymentInfo('DEBIT_CARD'),
			PaymentInfo : PaymentInfo('NET_BANKING')
		};
	}());
CitrusPay.Rest.Payment.Payment.Validators = ( function() {
		function validatePaymentRequest(data) {
			CitrusPay.Validators.RequiredValidator(data.merchantTxnId, "Merchant transaction id");
			CitrusPay.Rest.Payment.Validators.AmountValidator(data.amount);
			validateUserDetails(data.userDetails);
			CitrusPay.Validators.RequiredValidator(data.returnUrl, "Return url");
			CitrusPay.Validators.RegularExpressionValidator(data.returnUrl, 'URL', "Return url");
			validatePaymentToken(data.paymentToken);
			CitrusPay.Validators.OptionalRegularExpressionValidator(data.notify, 'URL', "Notify url");
			CitrusPay.Validators.RequiredValidator(data.merchantAccessKey, "Merchant access key");
			CitrusPay.Validators.RequiredValidator(data.requestSignature, "Request signature");
		}

		function validateUserDetails(data) {
			CitrusPay.Validators.RequiredValidator(data.email, "Email address");
			CitrusPay.Validators.RegularExpressionValidator(data.email, 'Email', "Email address");
			if(data.mobileNo){
				//CitrusPay.Validators.RegularExpressionValidator(data.mobileNo, 'Mobile', "Mobile Number");
				console.log(data.mobileNo.toString().length);
				if(data.mobileNo.toString().length<7)
					throw new Error("Invalid value: " + data.mobileNo + " for type: Mobile");
			}
			}
		
		function validatePaymentToken(data) {
			var classValidatorMap = {
				paymentOptionIdToken : validatePaymentOptionIdToken,
				paymentOptionToken : validatePaymentOptionToken
			};
			function validatePaymentOptionIdToken(data) {
				CitrusPay.Validators.RequiredValidator(data.id, "Payment option id");				
				CitrusPay.Validators.OptionalRegularExpressionValidator(data.cvv, "CVV");
			}
			function validatePaymentOptionToken(data) {
				validateModeOfPayment(data.paymentMode);
			}
			CitrusPay.Validators.RequiredValidator(data.type, "Payment token type");
			classValidatorMap[data.type](data);
		}

		function validateModeOfPayment(data) {
			var classValidatorMap = {
				netbanking : validateNetBanking,
				credit : validateCard,
				debit : validateCard,
				emi : validateCard,
				prepaid : validatePrepaid
			};
			function validateNetBanking(data) {
				CitrusPay.Validators.RequiredValidator(data.bank, "Bank name");
				CitrusPay.Validators.RequiredValidator(data.code, "Bank");
			}

			function validateCard(data) {
				data.scheme = CitrusPay.Scheme.Model.ReformatScheme(data.scheme);
				CitrusPay.Validators.RequiredValidator(data.scheme, "Card number");						
				CitrusPay.Validators.RequiredValidator(data.number, "Card number");
				 if (data.scheme !== 'MTRO') {
					CitrusPay.Validators.CardNumberValidator(data.number, 'CardNumber', "Card number");
				 }
				if (data.scheme === 'MTRO') {
					if(data.expiry !== null && data.expiry !== undefined && data.expiry !== "" && data.cvv !== null && data.cvv !== undefined && data.cvv !== "")
					{}
					else{
					var d = new Date();
					data.expiry = ("12" + "/" + (d.getFullYear() + 1));
					var randomnumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
					data.cvv = randomnumber;
					}
				}
				CitrusPay.Validators.RegularExpressionValidator(data.number, 'CardNumber', "Card number");
				CitrusPay.Validators.RequiredValidator(data.holder, "Card holder name");
				CitrusPay.Validators.RegularExpressionValidator(data.holder, 'Name', "Card holder");
				if (data.scheme !== 'MTRO')
				{
				CitrusPay.Validators.DateValidator(data.expiry, "Card expiry");
				CitrusPay.Validators.RequiredValidator(data.expiry, "Card expiry");
				CitrusPay.Validators.RequiredValidator(data.cvv, "CVV number");
				CitrusPay.Validators.RegularExpressionValidator(data.cvv, 'CVV', "CVV number");
				}
			}

			function validatePrepaid(data) {
				CitrusPay.Validators.RequiredValidator(data.scheme, "Card Scheme");
				CitrusPay.Validators.RequiredValidator(data.holder, "Card holder name");
			}

			CitrusPay.Validators.RequiredValidator(data.type, "Mode of payment type");
			classValidatorMap[data.type](data);
		}
			
			function validateVaultRequest(data) {				
				/*
				 * data = {				
					   card :{  
					      pan : jQuery("#citrusNumber").val().replace(/\s+/g, ''),
					      holder : jQuery('#citrusCardHolder').val(),
					      expiry : jQuery('#citrusExpiry').val().replace(/\s+/g, '')
					   },
					   hint :{  
					      mtx : jQuery("#citrusMerchantTxnId").val() ,
					      vanity : CitrusPay.Merchant.Config.Merchant.vanityUrl,
					      email : jQuery("#citrusEmail").val()
					   }				        				 
				  };
				 */
				data.scheme = CitrusPay.Scheme.Model.ReformatScheme(data.card.scheme);
				// CitrusPay.Validators.RequiredValidator(data.card.scheme, "Card scheme");						
				// CitrusPay.Validators.RequiredValidator(data.card.pan, "Card number");
				 if (data.scheme !== 'MTRO') {
					CitrusPay.Validators.CardNumberValidator(data.card.pan, 'CardNumber', "Card number");
				 }
				if (data.scheme === 'MTRO') {
					if(data.card.expiry !== null && data.card.expiry !== undefined && data.card.expiry !== "" && data.cvv !== null && data.cvv !== undefined && data.cvv !== "")
					{}
					else{
					var d = new Date();
					data.card.expiry = ("12" + "/" + (d.getFullYear() + 1));
					var randomnumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
					data.card.cvv = randomnumber;
					}
				}
				CitrusPay.Validators.RegularExpressionValidator(data.card.pan, 'CardNumber', "Card number");
				CitrusPay.Validators.RequiredValidator(data.card.holder, "Card holder name");
				CitrusPay.Validators.RegularExpressionValidator(data.card.holder, 'Name', "Card holder");
				if (data.card.scheme !== 'MTRO')
				{
				CitrusPay.Validators.DateValidator(data.card.expiry, "Card expiry");
				CitrusPay.Validators.RequiredValidator(data.card.expiry, "Card expiry");
				// CitrusPay.Validators.RequiredValidator(data.card.cvv, "CVV number");
				// CitrusPay.Validators.RegularExpressionValidator(data.card.cvv, 'CVV', "CVV number");
				}
			}
			
		return {
			PaymentRequestValidator : validatePaymentRequest,
			VaultRequestValidator : validateVaultRequest			
		};
	}());
function getUrlVars(url) {
	var vars = {};
	var parts = window.parent.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

CitrusPay.Rest.Payment.Payment.Service = ( function() {
		function makePayment(paymentRequest, vanityUrl, cb, cbErr) {
			jQuery.ajax({
				async : false,
				type : 'POST',
				url : CitrusPay.Rest.Payment.Payment.Config.getUrl('moto.struct') + vanityUrl,
				contentType : 'application/json',
				data : JSON.stringify(paymentRequest),
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making payment request.');
					cbErr ? cbErr() : '';
				}
			});
			
		}

		return {
			makePayment : makePayment
		};
	}());
CitrusPay.Rest.Payment.Payment.API = ( function() {
		function makePayment(paymentRequest, vanityUrl, cb, cbErr) {
			CitrusPay.Rest.Payment.Payment.Validators.PaymentRequestValidator(paymentRequest);
			CitrusPay.Rest.Payment.Payment.Service.makePayment(paymentRequest, vanityUrl, cb, cbErr);
		}
		return {
			makePayment : makePayment
		};
	}());
	
CitrusPay.DynamicPricing = {};	
CitrusPay.DynamicPricing.Config = ( function() {		 
		function getCouponValidityUrl() {			
			return CitrusPay.Config.getDpServer() + '/dynamicpricing/validateRuleForPayment';	
		}
		function getCalculatePricingUrl() {
			return CitrusPay.Config.getDpServer() + '/dynamicpricing/calculatePricingForPayment';
		}
		function getSearchAndApplyRuleUrl(){
			return CitrusPay.Config.getDpServer() + '/dynamicpricing/searchAndApplyRuleForPayment';
		} 
		function getqueryMerchantUrl(){
			return CitrusPay.Config.getDpServer() + '/dynamicpricing/queryMerchant';
		}
		return {
			getCouponValidityUrl : getCouponValidityUrl,
			getCalculatePricingUrl : getCalculatePricingUrl,
			getSearchAndApplyRuleUrl : getSearchAndApplyRuleUrl,
			getqueryMerchantUrl : getqueryMerchantUrl
		};
	}());
CitrusPay.DynamicPricing.Model = ( function() {
		function DynamicPricingRequest(data) {			 			 			
			return {
				ruleName : data.ruleName || '',
				email : data.email || '',
				phone : data.phone || '',				
				merchantTransactionId : data.merchantTransactionId || '',
				merchantAccessKey : data.merchantAccessKey || CitrusPay.Merchant.Config.Merchant.accessKey,
				signature : data.signature || '',
				originalAmount : data.originalAmount || CitrusPay.Rest.Payment.Model.Amount(),
				alteredAmount : data.alteredAmount || '',
				paymentInfo : data.paymentInfo || '',
				extraParams : data.extraParams || ''
			};
		};						
		return {
			DynamicPricingRequest : DynamicPricingRequest
		};
	}());
CitrusPay.DynamicPricing.Service = ( function() {
		function validateRule(data, cb, cbErr) {			
			jQuery.ajax({
				  type: "POST",				  
				  url: CitrusPay.DynamicPricing.Config.getCouponValidityUrl(),				  		  
				  contentType: "application/json;charset=utf-8",
				  data:JSON.stringify(data),
				  success : function(response){
				  	console.log(response);
					cb ? cb(response) : '';
				  },
				  error : function(err){
				  	console.log('Error in checking validity.');
					cbErr ? cbErr(err) : '';
				  }
			});			
		}

		function calculatePricing(data, cb, cbErr) {			
			 jQuery.ajax({
				  type: "POST",				  
				  url: CitrusPay.DynamicPricing.Config.getCalculatePricingUrl(),				  		  
				  contentType: "application/json;charset=utf-8",
				  data:JSON.stringify(data),
				  success : function(response){
				  	console.log(response);
					cb ? cb(response) : '';
				  },
				  error : function(err){
				  	console.log('Error in checking validity.');
					cbErr ? cbErr(err) : '';
				  }
			});	
		}
		
		function searchAndApplyRule(data, cb, cbErr) {			
			 jQuery.ajax({
				  type: "POST",				  
				  url: CitrusPay.DynamicPricing.Config.getSearchAndApplyRuleUrl(),				  		  
				  contentType: "application/json;charset=utf-8",
				  data:JSON.stringify(data),
				  success : function(response){
				  	console.log(response);
					cb ? cb(response) : '';
				  },
				  error : function(err){
				  	console.log('Error in checking validity.');
					cbErr ? cbErr(err) : '';
				  }
			});	
		}
		
		function queryMerchant(data, cb, cbErr) {			
			 jQuery.ajax({
				  type: "POST",				  
				  url: CitrusPay.DynamicPricing.Config.getqueryMerchantUrl(),				  		  
				  contentType: "application/json;charset=utf-8",
				  data:JSON.stringify(data),
				  success : function(response){				  	
					cb ? cb(response) : '';
				  },
				  error : function(err){
				  	console.log('Error in checking validity.');
					cbErr ? cbErr(err) : '';
				  }
			});	
		}

		return {
			validateRule : validateRule,
			calculatePricing : calculatePricing,
			searchAndApplyRule : searchAndApplyRule,
			queryMerchant : queryMerchant
		};
	}());
CitrusPay.DynamicPricing.API = ( function() {
		function validateRule(data, cb, cbErr){
			CitrusPay.DynamicPricing.Service.validateRule(data, cb, cbErr);
		}
		function calculatePricing(data, cb, cbErr){
			CitrusPay.DynamicPricing.Service.calculatePricing(data, cb, cbErr);
		}
		function searchAndApplyRule(data, cb, cbErr){
			CitrusPay.DynamicPricing.Service.searchAndApplyRule(data, cb, cbErr);
		}
		function queryMerchant(data, cb, cbErr){
			CitrusPay.DynamicPricing.Service.queryMerchant(data, cb, cbErr);
		}
						
		return {
			validateRule : validateRule,
			calculatePricing : calculatePricing,
			searchAndApplyRule : searchAndApplyRule,
			queryMerchant : queryMerchant
		};
	}());		
CitrusPay.COD = {};	
CitrusPay.COD.Config = ( function() {
		var codUrl = CitrusPay.Config.getV2Server() + "sslperf/nagama/zipcodecod";	
					
		function getCODUrl() {			
			return codUrl;
		}				
		return {
			getCODUrl : getCODUrl				
		};
	}());
CitrusPay.COD.Model = ( function() {
		function CODvalidatePinRequest(data) {			 			 			
			return {				
				        merTxnId: data.merTxnId || "",
						orderAmount: data.orderAmount || "",
						currency: data.currency || "INR",
						returnUrl:data.returnUrl || "",
						notifyUrl: data.notifyUrl|| "",
						zipcode: data.zipcode || "",
						vanity: CitrusPay.Merchant.Config.Merchant.vanityUrl || ""				 
				   };
		};								
		return {
			CODvalidatePinRequest : CODvalidatePinRequest			
		};
	}());
CitrusPay.COD.Service = ( function() {		
		function validatePin(data, cb, cbErr) {									 		
			 jQuery.ajax({
				  type: "POST",				  
				  url: CitrusPay.COD.Config.getCODUrl(),				  		  
				  contentType: "application/x-www-form-urlencoded",
				  data:data,
				  success : function(response){
					cb ? cb(response) : '';
				  },
				  error : function(err){
				  	console.log('Error in checking pin validity.');
					cbErr ? cbErr(err) : '';
				  }
			});	
		}								
		return {
			validatePin : validatePin								
		};
	}());
CitrusPay.COD.API = ( function() {
		function validatePin(data, cb, cbErr){
			CitrusPay.COD.Service.validatePin(data, cb, cbErr);
		}				
		return {
			validatePin : validatePin					
		};
	}());			

/*start of vault service*/

CitrusPay.Vault = {};	
CitrusPay.Vault.Config = (function() {
		var codUrl = CitrusPay.Config.getVaultServer();						
		function getVaultUrl(){			
			return codUrl + "/api/vault/tokenize/invertedi";
		}				
		return {
			getVaultUrl : getVaultUrl				
		};
	}());
CitrusPay.Vault.Model = ( function() {
		function vaultTokenRequest(data) {			 			 			
			return {				
					   card :{  
					      pan : data.card.pan,
					      holder :data.card.holder,
					      expiry :data.card.expiry
					   },
					   hint :data.hint				        				 
				   };
		};								
		return {
			vaultTokenRequest : vaultTokenRequest			
		};
	}());
CitrusPay.Vault.Service = ( function() {		
		function getVaultToken(data, cb, cbErr) {	
			 jQuery.ajax({
				  type: "POST",
				  crossDomain : true,				  
				  url: CitrusPay.Vault.Config.getVaultUrl(),				  		  
				  contentType: "application/json",
				  data:JSON.stringify(data),
				  success : function(response){
				  	if(response.token){
					cb ? cb(response) : '';
					} else {
						citrusServerErrorMsg(response);
					}
				  },
				  error : function(err){
				  	console.log('Error in getting the vault token.');
					cbErr ? cbErr(err) : '';
				  }
			});	
		}								
		return {
			getVaultToken : getVaultToken								
		};
	}());
CitrusPay.Vault.API = ( function() {
		function getVaultToken(data, cb, cbErr) {
			CitrusPay.Rest.Payment.Payment.Validators.VaultRequestValidator(data);
			CitrusPay.Vault.Service.getVaultToken(data, cb, cbErr);
		}				
		return {
			getVaultToken : getVaultToken					
		};
	}());			


/*end of vault service*/
		
	CitrusPay.EMI = {};	
CitrusPay.EMI.Config = ( function() {
		var emiUrl = CitrusPay.Config.getV2Server() + "";	
					
		function getEmiUrl() {			
			return emiUrl;
		}				
		return {
			getEmiUrl : getEmiUrl				
		};
	}());
CitrusPay.EMI.Model = ( function() {
		function emiRequest(data) {			 			 			
			return {				
				        merTxnId: data.merTxnId || "",
						orderAmount: data.orderAmount || "",
						currency: data.currency || "INR",
						returnUrl:data.returnUrl || "",
						notifyUrl: data.notifyUrl|| "",
						zipcode: data.zipcode || "",
						vanity: CitrusPay.Merchant.Config.Merchant.vanityUrl || ""				 
				   };
		};								
		return {
			emiRequest : emiRequest			
		};
	}());
CitrusPay.EMI.Service = ( function() {		
		function validateApplicableCard(data, cb, cbErr) {									 		
			 jQuery.ajax({
				  type: "POST",				  
				  url: CitrusPay.Config.getEmiServer() + "validateApplicableCard",					   		  		 
				  contentType: "application/json",
				  data:JSON.stringify(data),
				  success : function(response){
					cb ? cb(response) : '';
				  },
				  error : function(err){
				  	console.log('Error in validating applicable card .');
					cbErr ? cbErr(err) : '';
				  }
			});	
		}	
		
		function fetchBankDetails(data, cb, cbErr){			
			jQuery.ajax({
				  type: "POST",	
				  url: CitrusPay.Config.getEmiServer() + "fetchBankDetails",			  				  			  		 
				  contentType: "application/json",
				  data:JSON.stringify(data),
				  success : function(response){
					cb ? cb(response) : '';
				  },
				  error : function(err){
				  	console.log('Error in fetching bank details .');
					cbErr ? cbErr(err) : '';
				  }
			});	
		}
		
		function fetchTenureDetails(data, cb, cbErr){
			jQuery.ajax({
				  type: "POST",				  				  	  
				  url: CitrusPay.Config.getEmiServer() + "fetchTenureDetails",			  		  
				  contentType: "application/json",
				  data:JSON.stringify(data),
				  success : function(response){
					cb ? cb(response) : '';
				  },
				  error : function(err){
				  	console.log('Error in fetching tenure details .');
					cbErr ? cbErr(err) : '';
				  }
			});	
		}
									
		return {
			validateApplicableCard : validateApplicableCard,
			      fetchBankDetails : fetchBankDetails,
			    fetchTenureDetails : fetchTenureDetails								
		};
	}());
CitrusPay.EMI.API = ( function() {
		function validateApplicableCard(data, cb, cbErr){
			CitrusPay.EMI.Service.validateApplicableCard(data, cb, cbErr);
		}
		
		function fetchBankDetails(data, cb, cbErr){
			CitrusPay.EMI.Service.fetchBankDetails(data, cb, cbErr);
		}				
		
		function fetchTenureDetails(data, cb, cbErr){
			CitrusPay.EMI.Service.fetchTenureDetails(data, cb, cbErr);
		}	
			
		return {
			validateApplicableCard : validateApplicableCard,
			fetchBankDetails : fetchBankDetails,
			fetchTenureDetails : fetchTenureDetails			 	
		};
	}());				
var mtx = jQuery("#citrusMerchantTxnId").val();
var amount = CitrusPay.Rest.Payment.Model.Amount({
	value : jQuery('#citrusAmount').val()
});
function removeNulls(obj) {
	var isArray = obj instanceof Array;
	for (var k in obj) {
		if (obj[k] === null)
			isArray ? obj.splice(k, 1) :
			delete obj[k];
		else if ( typeof obj[k] == "object")
			removeNulls(obj[k]);
	}
	return 1;
}

function citrusFilterWallet(paymentOptions, wallet) {
	var len = wallet.length;
	var nbLength = paymentOptions.netBanking.length;
	var ccLength = paymentOptions.creditCard.length;
	var dcLength = paymentOptions.debitCard.length,
	    type;
	var availableBanks = [];
	var availableCC = [];
	var availableDC = [];	
	for (var i = 0; i < nbLength; i++) {
		availableBanks.push(paymentOptions.netBanking[i].bankName);
	}	
	for (var i = 0; i < ccLength; i++) {
		if (jQuery.inArray(paymentOptions.creditCard[i].toLowerCase(), availableCC) === -1) {
			availableCC.push(paymentOptions.creditCard[i].toLowerCase());
			type = CitrusPay.Scheme.Model.ReformatScheme(paymentOptions.creditCard[i].toLowerCase());
			CitrusPay.Scheme.Config.credit.push(type);
		}
	}	 
	paymentOptions.creditCard = availableCC;	
	for (var i = 0; i < dcLength; i++) {
		if (jQuery.inArray(paymentOptions.debitCard[i].toLowerCase(), availableDC) === -1) {
			availableDC.push(paymentOptions.debitCard[i].toLowerCase());
			type = CitrusPay.Scheme.Model.ReformatScheme(paymentOptions.debitCard[i].toLowerCase());
			CitrusPay.Scheme.Config.debit.push(type);
		}
	}	
	paymentOptions.debitCard = availableDC;
	var el;
	var filteredWallet = {};
	for (var i = 0; i < len; i++) {
		switch(wallet[i].type) {
		case 'netbanking' :
			el = wallet[i].bank;
			if (jQuery.inArray(el, availableBanks) === -1) {
				delete wallet[i];
			}
			break;
		case 'credit'    :
			if (wallet[i].scheme !== null && wallet[i].scheme !== undefined) {
				el = wallet[i].scheme.toLowerCase();
				if (jQuery.inArray(el, availableCC) === -1) {
					delete wallet[i];
				}
			}
			break;
		case 'debit'     :
			if (wallet[i].scheme !== null && wallet[i].scheme !== undefined) {
				el = wallet[i].scheme.toLowerCase();
				if (jQuery.inArray(el, availableDC) === -1) {
					delete wallet[i];
				}
			}
			break;
		default          :
			delete wallet[i];
		}
		if (wallet[i] !== null) {
			filteredWallet[i] = wallet[i];
		}
	}
	var filteredResponse = {};
	filteredResponse.paymentOptions = paymentOptions;
	filteredResponse.wallet = wallet;
	removeNulls(filteredResponse);	
	return filteredResponse;
}

function fetchmerchantPaymentOptions(availablePaymentOptions, isWalletEnabled) {
	var vanityUrl = CitrusPay.Merchant.Config.Merchant.vanityUrl;
	CitrusPay.Rest.Merchant.API.getavailablePaymentOptions(vanityUrl, function(response) {		
		var flag = isJSON(response);
		if(flag === true)	
		{ response = JSON.parse(response);  }
		var filteredResponse = citrusFilterWallet(response, availablePaymentOptions);
		if (isWalletEnabled === true) {
			var wallet = filteredResponse.wallet;
			handleCitrusWallet(wallet);
		} else {
			var paymentOptions = filteredResponse.paymentOptions;			
			handleCitrusPaymentOptions(paymentOptions);
		}
	}, function() {
		console.log("Error in retrieving the options");
	});
}

function isJSON(data) {
   var ret = true;
   try {
      JSON.parse(data);
   }catch(e) {
      ret = false;
   }
   return ret;
}
//Payment function
function memberPayment(modeOfPayment, isToken) {	
	var paymentToken = jQuery('input[name=CitrusWalletPaymentOption]:checked').val();
	var paymentOptionIdToken;
	var isNew = 0;
	var mtx = jQuery("#citrusMerchantTxnId").val();
	var requestOrigin = "CJSG";	
	
    var amount = CitrusPay.Rest.Payment.Model.Amount({
	value : jQuery('#citrusAmount').val()
    });
    var emiToken = jQuery("#citrusEmiToken").val();
    
	var vanityUrl = CitrusPay.Merchant.Config.Merchant.vanityUrl;
	var paymentObj;
	var user = CitrusPay.Rest.Payment.Payment.Model.UserDetails({
		email : jQuery('#citrusEmail').val(),
		firstName : jQuery('#citrusFirstName').val(),
		lastName : jQuery('#citrusLastName').val(),
		address : CitrusPay.Rest.Payment.Payment.Model.Address({
			street1 : jQuery('#citrusStreet1').val(),
			street2 : jQuery('#citrusStreet2').val(),
			city : jQuery('#citrusCity').val(),
			state : jQuery('#citrusState').val(),
			country : jQuery('#citrusCountry').val(),
			zip : jQuery('#citrusZip').val()
		}),
		mobileNo : jQuery('#citrusMobile').val()
	});
	//Netbanking payment
	if (modeOfPayment == 'netBanking') { //Guest Netbanking payment
		if (isToken === true && typeof (paymentToken) !== "undefined" && paymentToken !== null) {
			requestOrigin = "CJSW";
			paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.MemberPaymentOptionToken({
				id : paymentToken
			});
		} else { //Member Netbanking payment			
			var bankName = jQuery('#citrusAvailableOptions option:selected').text();
			var bankCode = jQuery('#citrusAvailableOptions').val();
			paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionToken({
				paymentMode : CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.NetBanking({
					type : 'netbanking',
					bank : bankName,
					code : bankCode
				})
			});
		}
	} else if (modeOfPayment == 'card') {	//Guest Card payment	
		if ( isToken === true && typeof (paymentToken) !== "undefined" && paymentToken !== null) {
			requestOrigin = "CJSW";
			var token = paymentToken.split("&")[1];
			var optionindex = paymentToken.split("&")[0];
			paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionIdToken({
				type : 'paymentOptionIdToken',
				id : token,
				cvv : jQuery("#CitrusMembercvv" + optionindex).val()
			});
		} else {			
			var type = jQuery("#citrusCardType").val().toLowerCase();
			var cardNum = jQuery('#citrusNumber').val().replace(/\s+/g, '');
			var cardExp = jQuery('#citrusExpiry').val().replace(/\s+/g, '');			
			switch(type) {
			case "credit" :
			if(emiToken){
				paymentObj = CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.EmiCreditCard({
					scheme : jQuery('#citrusScheme').val(),
					number : cardNum,
					holder : jQuery('#citrusCardHolder').val(),
					expiry : cardExp,
					cvv : jQuery('#citrusCvv').val()
				});
				
			}else
			{	
				paymentObj = CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.CreditCard({
					scheme : jQuery('#citrusScheme').val(),
					number : cardNum,
					holder : jQuery('#citrusCardHolder').val(),
					expiry : cardExp,
					cvv : jQuery('#citrusCvv').val()
				});
			}	
				break;
			case "debit" :
				paymentObj = CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.DebitCard({
					scheme : jQuery('#citrusScheme').val(),
					number : cardNum,
					holder : jQuery('#citrusCardHolder').val(),
					expiry : cardExp,
					cvv : jQuery('#citrusCvv').val()
				});
				break;
			}
			paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionToken({
				paymentMode : paymentObj
			});
		}
	} else if (modeOfPayment == 'citrusbanking') {
		paymentObj = CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.PrepaidCard({
			scheme : "CPAY",
			holder : jQuery('#citrusPrepaidCardHolder').val()
		});

		paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionToken({
			paymentMode : paymentObj
		});
	}	
	var paymentRequest = CitrusPay.Rest.Payment.Payment.Model.PaymentRequest({
		returnUrl : jQuery('#citrusReturnUrl').val(),
		notifyUrl : jQuery('#citrusNotifyUrl').val(),
		amount : amount,
		merchantAccessKey : CitrusPay.Merchant.Config.Merchant.accessKey,
		paymentToken : paymentOptionIdToken,
		merchantTxnId : mtx,
		requestSignature : jQuery('#citrusSignature').val(),
		userDetails : user					
	});
	var numOfCustomParams = parseInt(jQuery("#citrusCustomParamCount").val());
	var paramName,
	    paramValue;
	if (numOfCustomParams !== null && typeof (numOfCustomParams) !== "undefined" && numOfCustomParams > 0) {
		paymentRequest.customParameters = {};
	}
	//Add custom parameters
	for (var i = 1; i <= numOfCustomParams; i++) {
		paramName = jQuery("#citrusCustomParamsName" + i).val();
		paramValue = jQuery("#citrusCustomParamsValue" + i).val();
		paymentRequest.customParameters[paramName] = paramValue;
	}
	var offerToken = jQuery('#citrusOfferToken').val();
	if(offerToken)
	{
		paymentRequest.offerToken = offerToken;
	}
	if(emiToken)
	{
		paymentRequest.emiToken = emiToken;		
	}
	
	paymentRequest.requestOrigin = requestOrigin;
	CitrusPay.Rest.Payment.Payment.API.makePayment(paymentRequest, vanityUrl, function(response) {
		var flag = isJSON(response);
  		if(flag === true) 
  	    { response = JSON.parse(response);  }
		if (!!response && response.pgRespCode === "0") {
			window.location = response.redirectUrl;
		} else {
			citrusServerErrorMsg(response);
		}
	}, function(e) {
		citrusServerErrorMsg(e);
		console.log('Error making payment request.');
	});
}

function fetchPaymentOptions() {
	 fetchmerchantPaymentOptions([], false);	 	
}
function makePayment(mode,isToken) {
	if(isToken !== true)
	{
		isToken = false;
	}
	mode = mode.toLowerCase();
	switch (mode) {
	case   "card" :
		memberPayment("card", isToken);
		break;
	case "netbanking" :
		memberPayment("netBanking", isToken);
		break;
	case "citrusbanking" :
		memberPayment("citrusbanking", isToken);
		break;
	case "cod" :
		COD();	
		break;
	}
}
function getPGhealth()
{	    
		CitrusPay.Rest.Merchant.API.getPgHealth(CitrusPay.Merchant.Config.Merchant.vanityUrl, function(resp){
			handlePGhealthResponse(resp);			
		},function(error){
			console.log("Error in retreiving PG health options.");	
		});	
}
function queryMerchant()
{
	var vanity = CitrusPay.Merchant.Config.Merchant.accessKey;
	var signature = $("#citrusQueryMerchantSignature").val();
	CitrusPay.DynamicPricing.API.queryMerchant({merchantAccessKey : vanity, signature : signature},function(response){
					var flag = isJSON(response);
			  		if(flag === true) 
			  	    {response = JSON.parse(response);}		
					handleQueryResponse(response);
	},function(){
		handleQueryResponse();		
	});
}
function dynamicPricing(paymentMode)
{		
	var device = "WEB"; //initiate as web
		// device detection
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) 
    	{device = "MOBILE";}
    	else{
    		device = "DESKTOP";
    	}  
	var data = {
    				ruleName : $('#citrusRuleName').val(), 
    				email : $('#citrusEmail').val(), 
    				phone : $('#citrusMobile').val(), 
    				merchantTransactionId : $("#citrusMerchantTxnId").val(),     				
    				merchantAccessKey : CitrusPay.Merchant.Config.Merchant.accessKey, 
    				signature : $('#citrusDpSignature').val(), 
    				originalAmount : {
    					value : $("#citrusAmount").val(), currency : "INR"
    				},
		    		alteredAmount : {
						value : $("#citrusAlteredAmount").val(), currency : "INR"
					},
    				paymentInfo:{    					
    				},
    				extraParams : {
    					deviceType : device
    				}					
    	  	   }; 
    
    switch(paymentMode)
    {
    	case "CITRUS_WALLET" :  var token = jQuery('input[name=CitrusWalletPaymentOption]:checked').val();
    						    data.paymentInfo = {
													cardNo : "",
													cardType: "",
													issuerId: "",
													paymentMode: "CITRUS_WALLET",
													paymentToken: jQuery('input[name=CitrusWalletPaymentOption]:checked').val()
												  	};
												  	 if(token.indexOf('&') === -1)
													{
													  data.paymentInfo.paymentToken = jQuery('input[name=CitrusWalletPaymentOption]:checked').val();
													}else{
													   var arr = token.split('&');
													   data.paymentInfo.paymentToken = arr[1];
													}
													 break;
    	case "PREPAID_CARD" : data.paymentInfo = {
    												cardNo : "",
													cardType: "",
													issuerId: "",
													paymentMode: "PREPAID_CARD",
													paymentToken: ""
    											 }; break;
    	case "CREDIT_CARD" : data.paymentInfo = { 
	    											cardNo : jQuery("#citrusNumber").val().replace(/\s+/g, ''),
													cardType: CitrusPay.Scheme.Model.ReformatScheme(jQuery("#citrusScheme").val()),
													issuerId: "",
													paymentMode: "CREDIT_CARD",
													paymentToken: ""
    											};break;
    	case "DEBIT_CARD" : data.paymentInfo = { 
    												cardNo : jQuery("#citrusNumber").val().replace(/\s+/g, ''),
													cardType: CitrusPay.Scheme.Model.ReformatScheme(jQuery("#citrusScheme").val()),
													issuerId: "",
													paymentMode: "DEBIT_CARD",
													paymentToken: ""
    											}; break;
    	case "NET_BANKING" : data.paymentInfo = {
    												cardNo : "",
													cardType: "",
													issuerId: jQuery("#citrusAvailableOptions option:selected").val(),													
													paymentMode: "NET_BANKING",
													paymentToken: "" 
    											}; break;
    }
       
     if(data.ruleName && data.alteredAmount.value)
     {  		
		CitrusPay.DynamicPricing.API.validateRule(
			CitrusPay.DynamicPricing.Model.DynamicPricingRequest(data),
			function(response){
				console.log(response);
				if(response.resultMessage === "SUCCESS" && response.offerToken){
					jQuery("#citrusOfferToken").val(response.offerToken);
					var flag = isJSON(response);
			  		if(flag === true) 
			  	    { response = JSON.parse(response);  }
					handleDpResponse(response,paymentMode);
				}else{
					jQuery("#citrusOfferToken").val("");
				}			
			},function(error){
				console.log(error);
			}		
		);
	}	
	else if(data.ruleName && !data.alteredAmount.value)
	{	
	CitrusPay.DynamicPricing.API.calculatePricing(
		CitrusPay.DynamicPricing.Model.DynamicPricingRequest(data),
		function(response){			 
			if(response.resultMessage === "SUCCESS" && response.offerToken){
					jQuery("#citrusOfferToken").val(response.offerToken);
					var flag = isJSON(response);
			  		if(flag === true) 
			  	    { response = JSON.parse(response);  }
					handleDpResponse(response,paymentMode);
				}else{
					jQuery("#citrusOfferToken").val("");
				}			 		
		},function(error){
			console.log(error);
		}		
	);
	}
	else if(!data.ruleName && !data.alteredAmount.value)
	{	
	CitrusPay.DynamicPricing.API.searchAndApplyRule(
		CitrusPay.DynamicPricing.Model.DynamicPricingRequest(data),
		function(response){
			console.log(response);
			if(response.resultMessage === "SUCCESS" && response.offerToken){
					jQuery("#citrusOfferToken").val(response.offerToken);
					handleDpResponse(response,paymentMode);
				}else{
					jQuery("#citrusOfferToken").val("");
				}				 		
		},function(error){
			console.log(error);
		}		
	);
	}		
}
function validatePin()
{
	var data = {
				merTxnId:jQuery("#citrusMerchantTxnId").val(),
				orderAmount : jQuery("#citrusAmount").val(),				 
				returnUrl:jQuery("#citrusReturnUrl").val(),
				notifyUrl : jQuery("#citrusNotifyUrl").val(),
				zipcode : jQuery("#citrusZip").val()				 
				};
	CitrusPay.COD.API.validatePin(CitrusPay.COD.Model.CODvalidatePinRequest(data),function(response){		
		console.log(response);
	},function(err){		
		console.log(err);
	});	
}
function  validateApplicableCard(){
	var signature = jQuery("#citrusEmiSignature").val();
	      var mtx = jQuery("#citrusMerchantTxnId").val();
	var accessKey = CitrusPay.Merchant.Config.Merchant.accessKey;
	   var amount = parseFloat(jQuery("#citrusAmount").val());   
	   var cardNum = jQuery('#citrusNumber').val().replace(/\s+/g, '');
	   var cardBin = cardNum.substring(0,6);	  
	   var arr = jQuery('input[name=citrusTenureDetails]:checked').val().split('&'); 
	var data = {
    "emiBody": {
        "merchantAccessKey": {
            "data": accessKey
        },
        "cardBin": {
            "data": cardBin
        },
        "bankCode": {
            "data": arr[0]
        },
        "tenureCode": {
            "data": arr[1]
        },
        "merchantTransactionId": {
            "data": mtx
        },
        "transactionAmount": {
            "data": amount
        },
        "emiSignature": {
            "data": signature
        },
        "transactionCurrency": {
            "data": "INR"
        },
        "interestPaidAmount": {
            "data": arr[2]
        },
        "monthlyInstallment": {
            "data": arr[3]
        }
    }
};
CitrusPay.EMI.API.validateApplicableCard(data, function(response){console.log(response);				
				if(response.resultMessage === "SUCCESS"){
					jQuery("#citrusEmiToken").val(response.resultBody.token.data);
					handleApplicableCardResponse(response);
				}else{
					jQuery("#citrusEmiToken").val("");
					handleApplicableCardResponse(response);
				}
	},function(err){console.log(err);});
}

function  fetchBankDetails(){
	var signature = jQuery("#citrusEmiSignature").val();
	      var mtx = jQuery("#citrusMerchantTxnId").val();
	      var accessKey = CitrusPay.Merchant.Config.Merchant.accessKey;
	      var amount = parseFloat(jQuery("#citrusAmount").val());
	var data = {
    "emiBody": {
        "merchantAccessKey": {
            "data": accessKey
        },
        "merchantTransactionId": {
            "data": jQuery("#citrusMerchantTxnId").val() 
        },
        "transactionAmount": {
            "data": amount
        },
        "emiSignature": {
            "data": jQuery("#citrusEmiSignature").val()
        },
        "transactionCurrency": {
            "data": "INR"
        }
    }
};
CitrusPay.EMI.API.fetchBankDetails(data, function(resp){console.log(resp);handleEmiBankDetails(resp);},function(err){console.log(err);});
}
function  fetchBankTenureDetails(){
	var signature = jQuery("#citrusEmiSignature").val();
	      var mtx = jQuery("#citrusMerchantTxnId").val();
	   var amount = parseFloat(jQuery("#citrusAmount").val());
	var accessKey = CitrusPay.Merchant.Config.Merchant.accessKey;
	   
	var data = {
    "emiBody": {
        "merchantAccessKey": {
            "data": accessKey
        },
        "merchantTransactionId": {
            "data": jQuery("#citrusMerchantTxnId").val()
        },
        "bankCode": {
            "data": jQuery("#citrusEmiOptions").val()
        },
        "transactionAmount": {
            "data": amount
        },
        "emiSignature": {
            "data": jQuery("#citrusEmiSignature").val()
        },
        "transactionCurrency": {
            "data": "INR"
        }
    }
};
CitrusPay.EMI.API.fetchTenureDetails(data, function(resp){console.log(resp);handleBankTenureDetails(resp);},function(err){console.log(err);});
}
function getVaultToken()
{
			var data = {				
					   card :{  
					      pan : jQuery("#citrusNumber").val().replace(/\s+/g, ''),
					      holder : jQuery('#citrusCardHolder').val(),
					      expiry : jQuery('#citrusExpiry').val().replace(/\s+/g, ''),
					      scheme : jQuery('#citrusScheme').val(),
					      cvv : jQuery('#citrusCvv').val()
					   },
					   hint :{  
					      mtx : jQuery("#citrusMerchantTxnId").val() ,
					      vanity : CitrusPay.Merchant.Config.Merchant.vanityUrl,
					      email : jQuery("#citrusEmail").val()
					   }				        				 
				  };
		if($("#citrusCardType").val().toLowerCase() !== "credit")
		{citrusClientErrMsg("Please select credit card"); } 
		else{
		CitrusPay.Vault.API.getVaultToken(CitrusPay.Vault.Model.vaultTokenRequest(data),function(resp){console.log(resp);handleVaultTokenResponse(resp);},function(error){console.log(error);});
		}	
}
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace eBook.Utilities.Constants
{
    public class SystemConstants
    {
        public const string MainConnectionString = "eBookDb";

        public const string CacheConnectionString = "Redis";
        public class AppSettings
        {
            public const string DefaultLanguageId = "DefaultLanguageId";
            public const string Token = "Token";
            public const string BaseAddress = "BaseAddress";
        }
        public class PaymentApi
        {
            public const string Url = "VNpayApi:Url";
            public const string ReturnUrl = "VNpayApi:ReturnUrl";
            public const string TmnCode = "VNpayApi:TmnCode";
            public const string HashSecret = "VNpayApi:HashSecret";
        }
        public class FaceBookAuthentication
        {
            public const string FacebookAppId = "FaceBookSetting:FacebookAppId";
            public const string FacebookAppSecret = "FaceBookSetting:FacebookAppSecret";
            public const string FacebookRedirectUri = "FaceBookSetting:FacebookRedirectUri";
        }
        public class GoogleAuthentication
        {
            public const string GoogleClientId = "GoogleSetting:GoogleClientId";
            public const string GoogleRedirectUri = "GoogleSetting:GoogleRedirectUri";
            public const string Scope = "GoogleSetting:Scope";
            public const string ClientSecret = "GoogleSetting:ClientSecret";
        }
    }
}

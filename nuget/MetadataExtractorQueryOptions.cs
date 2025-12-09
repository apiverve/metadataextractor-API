using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace APIVerve.API.MetadataExtractor
{
    /// <summary>
    /// Query options for the Metadata Extractor API
    /// </summary>
    public class MetadataExtractorQueryOptions
    {
        /// <summary>
        /// The URL of the web page to extract metadata from
        /// </summary>
        [JsonProperty("url")]
        public string Url { get; set; }
    }
}

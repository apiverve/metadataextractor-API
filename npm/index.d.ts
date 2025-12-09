declare module '@apiverve/metadataextractor' {
  export interface metadataextractorOptions {
    api_key: string;
    secure?: boolean;
  }

  export interface metadataextractorResponse {
    status: string;
    error: string | null;
    data: MetadataExtractorData;
    code?: number;
  }


  interface MetadataExtractorData {
      requestURL:               string;
      url:                      string;
      canonical:                string;
      charset:                  string;
      title:                    string;
      image:                    string;
      favicons:                 Favicon[];
      author:                   string;
      description:              string;
      keywords:                 string;
      source:                   string;
      price:                    string;
      priceCurrency:            string;
      availability:             string;
      robots:                   string;
      jsonld:                   any[];
      ogURL:                    string;
      ogLocale:                 string;
      ogLocaleAlternate:        string;
      ogTitle:                  string;
      ogType:                   string;
      ogDescription:            string;
      ogDeterminer:             string;
      ogSiteName:               string;
      ogImage:                  string;
      ogImageSecureURL:         string;
      ogImageType:              string;
      ogImageWidth:             string;
      ogImageHeight:            string;
      twitterTitle:             string;
      twitterDescription:       string;
      twitterImage:             string;
      twitterImageAlt:          string;
      twitterCard:              string;
      twitterSite:              string;
      twitterSiteID:            string;
      twitterURL:               string;
      twitterAccountID:         string;
      twitterCreator:           string;
      twitterCreatorID:         string;
      twitterPlayer:            string;
      twitterPlayerWidth:       string;
      twitterPlayerHeight:      string;
      twitterPlayerStream:      string;
      twitterAppNameIphone:     string;
      twitterAppIDIphone:       string;
      twitterAppURLIphone:      string;
      twitterAppNameIpad:       string;
      twitterAppIDIpad:         string;
      twitterAppURLIpad:        string;
      twitterAppNameGoogleplay: string;
      twitterAppIDGoogleplay:   string;
      twitterAppURLGoogleplay:  string;
      headings:                 Heading[];
      imgTags:                  ImgTag[];
      responseBody:             string;
      fbAppID:                  string;
      msapplicationTileColor:   string;
      msapplicationTileImage:   string;
      pDomainVerify:            string;
  }
  
  interface Favicon {
      rel:    string;
      href:   string;
      sizes?: string;
  }
  
  interface Heading {
      level: Level;
      text:  string;
  }
  
  enum Level {
      H1 = "h1",
      H2 = "h2",
      H3 = "h3",
      H4 = "h4",
      H5 = "h5",
      H6 = "h6",
  }
  
  interface ImgTag {
      src:  string;
      alt?: string;
  }

  export default class metadataextractorWrapper {
    constructor(options: metadataextractorOptions);

    execute(callback: (error: any, data: metadataextractorResponse | null) => void): Promise<metadataextractorResponse>;
    execute(query: Record<string, any>, callback: (error: any, data: metadataextractorResponse | null) => void): Promise<metadataextractorResponse>;
    execute(query?: Record<string, any>): Promise<metadataextractorResponse>;
  }
}

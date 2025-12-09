APIVerve.API.MetadataExtractor API
============

Metadata Extractor is a simple tool for extracting metadata from web pages. It returns the meta title, meta description, and more.

![Build Status](https://img.shields.io/badge/build-passing-green)
![Code Climate](https://img.shields.io/badge/maintainability-B-purple)
![Prod Ready](https://img.shields.io/badge/production-ready-blue)

This is a .NET Wrapper for the [APIVerve.API.MetadataExtractor API](https://apiverve.com/marketplace/metadataextractor)

---

## Installation

Using the .NET CLI:
```
dotnet add package APIVerve.API.MetadataExtractor
```

Using the Package Manager:
```
nuget install APIVerve.API.MetadataExtractor
```

Using the Package Manager Console:
```
Install-Package APIVerve.API.MetadataExtractor
```

From within Visual Studio:

1. Open the Solution Explorer
2. Right-click on a project within your solution
3. Click on Manage NuGet Packages
4. Click on the Browse tab and search for "APIVerve.API.MetadataExtractor"
5. Click on the APIVerve.API.MetadataExtractor package, select the appropriate version in the right-tab and click Install

---

## Configuration

Before using the metadataextractor API client, you have to setup your account and obtain your API Key.
You can get it by signing up at [https://apiverve.com](https://apiverve.com)

---

## Quick Start

Here's a simple example to get you started quickly:

```csharp
using System;
using APIVerve;

class Program
{
    static async Task Main(string[] args)
    {
        // Initialize the API client
        var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]");

        var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};

        // Make the API call
        try
        {
            var response = await apiClient.ExecuteAsync(queryOptions);

            if (response.Error != null)
            {
                Console.WriteLine($"API Error: {response.Error}");
            }
            else
            {
                Console.WriteLine("Success!");
                // Access response data using the strongly-typed ResponseObj properties
                Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
        }
    }
}
```

---

## Usage

The APIVerve.API.MetadataExtractor API documentation is found here: [https://docs.apiverve.com/ref/metadataextractor](https://docs.apiverve.com/ref/metadataextractor).
You can find parameters, example responses, and status codes documented here.

### Setup

###### Authentication
APIVerve.API.MetadataExtractor API uses API Key-based authentication. When you create an instance of the API client, you can pass your API Key as a parameter.

```csharp
// Create an instance of the API client
var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]");
```

---

## Usage Examples

### Basic Usage (Async/Await Pattern - Recommended)

The modern async/await pattern provides the best performance and code readability:

```csharp
using System;
using System.Threading.Tasks;
using APIVerve;

public class Example
{
    public static async Task Main(string[] args)
    {
        var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]");

        var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};

        var response = await apiClient.ExecuteAsync(queryOptions);

        if (response.Error != null)
        {
            Console.WriteLine($"Error: {response.Error}");
        }
        else
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
        }
    }
}
```

### Synchronous Usage

If you need to use synchronous code, you can use the `Execute` method:

```csharp
using System;
using APIVerve;

public class Example
{
    public static void Main(string[] args)
    {
        var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]");

        var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};

        var response = apiClient.Execute(queryOptions);

        if (response.Error != null)
        {
            Console.WriteLine($"Error: {response.Error}");
        }
        else
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
        }
    }
}
```

---

## Error Handling

The API client provides comprehensive error handling. Here are some examples:

### Handling API Errors

```csharp
using System;
using System.Threading.Tasks;
using APIVerve;

public class Example
{
    public static async Task Main(string[] args)
    {
        var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]");

        var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};

        try
        {
            var response = await apiClient.ExecuteAsync(queryOptions);

            // Check for API-level errors
            if (response.Error != null)
            {
                Console.WriteLine($"API Error: {response.Error}");
                Console.WriteLine($"Status: {response.Status}");
                return;
            }

            // Success - use the data
            Console.WriteLine("Request successful!");
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
        }
        catch (ArgumentException ex)
        {
            // Invalid API key or parameters
            Console.WriteLine($"Invalid argument: {ex.Message}");
        }
        catch (System.Net.Http.HttpRequestException ex)
        {
            // Network or HTTP errors
            Console.WriteLine($"Network error: {ex.Message}");
        }
        catch (Exception ex)
        {
            // Other errors
            Console.WriteLine($"Unexpected error: {ex.Message}");
        }
    }
}
```

### Comprehensive Error Handling with Retry Logic

```csharp
using System;
using System.Threading.Tasks;
using APIVerve;

public class Example
{
    public static async Task Main(string[] args)
    {
        var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]");

        // Configure retry behavior (max 3 retries)
        apiClient.SetMaxRetries(3);        // Retry up to 3 times (default: 0, max: 3)
        apiClient.SetRetryDelay(2000);     // Wait 2 seconds between retries

        var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};

        try
        {
            var response = await apiClient.ExecuteAsync(queryOptions);

            if (response.Error != null)
            {
                Console.WriteLine($"API Error: {response.Error}");
            }
            else
            {
                Console.WriteLine("Success!");
                Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed after retries: {ex.Message}");
        }
    }
}
```

---

## Advanced Features

### Custom Headers

Add custom headers to your requests:

```csharp
var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]");

// Add custom headers
apiClient.AddCustomHeader("X-Custom-Header", "custom-value");
apiClient.AddCustomHeader("X-Request-ID", Guid.NewGuid().ToString());

var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};

var response = await apiClient.ExecuteAsync(queryOptions);

// Remove a header
apiClient.RemoveCustomHeader("X-Custom-Header");

// Clear all custom headers
apiClient.ClearCustomHeaders();
```

### Request Logging

Enable logging for debugging:

```csharp
var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]", isDebug: true);

// Or use a custom logger
apiClient.SetLogger(message =>
{
    Console.WriteLine($"[LOG] {DateTime.Now:yyyy-MM-dd HH:mm:ss} - {message}");
});

var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};

var response = await apiClient.ExecuteAsync(queryOptions);
```

### Retry Configuration

Customize retry behavior for failed requests:

```csharp
var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]");

// Set retry options
apiClient.SetMaxRetries(3);           // Retry up to 3 times (default: 0, max: 3)
apiClient.SetRetryDelay(1500);        // Wait 1.5 seconds between retries (default: 1000ms)

var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};

var response = await apiClient.ExecuteAsync(queryOptions);
```

### Dispose Pattern

The API client implements `IDisposable` for proper resource cleanup:

```csharp
using (var apiClient = new MetadataExtractorAPIClient("[YOUR_API_KEY]"))
{
    var queryOptions = new MetadataExtractorQueryOptions {
  url = "https://apiverve.com"
};
    var response = await apiClient.ExecuteAsync(queryOptions);
    Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
}
// HttpClient is automatically disposed here
```

---

## Example Response

```json
{
  "status": "ok",
  "error": null,
  "data": {
    "requestUrl": "https://myspace.com",
    "url": "https://myspace.com/",
    "canonical": "https://myspace.com/discover/featured",
    "charset": "utf-8",
    "title": "Featured Content on Myspace",
    "image": "",
    "favicons": [
      {
        "rel": "shortcut icon",
        "href": "https://x.myspacecdn.com/new/common/images/favicons/favicon.ico"
      },
      {
        "rel": "icon",
        "href": "https://x.myspacecdn.com/new/common/images/favicons/favicon.png"
      },
      {
        "rel": "apple-touch-icon",
        "href": "https://x.myspacecdn.com/new/common/images/favicons/57-iPhone.png"
      },
      {
        "rel": "apple-touch-icon",
        "href": "https://x.myspacecdn.com/new/common/images/favicons/72-iPad.png",
        "sizes": "72x72"
      },
      {
        "rel": "apple-touch-icon",
        "href": "https://x.myspacecdn.com/new/common/images/favicons/114-Retina-iPhone.png",
        "sizes": "114x114"
      },
      {
        "rel": "apple-touch-icon",
        "href": "https://x.myspacecdn.com/new/common/images/favicons/144-Retina-iPad.png",
        "sizes": "144x144"
      }
    ],
    "author": "",
    "description": "Featured Content on Myspace",
    "keywords": "Myspace, social entertainment, artist tools, social media, social discovery, creative community, empowering expression, stream music, music videos, music, share music, playlists, mixes, profiles, discovery, discover",
    "source": "",
    "price": "",
    "priceCurrency": "",
    "availability": "",
    "robots": "",
    "jsonld": [],
    "og:url": "https://myspace.com/discover/featured",
    "og:locale": "",
    "og:locale:alternate": "",
    "og:title": "Featured Content on Myspace",
    "og:type": "article",
    "og:description": "Featured Content on Myspace",
    "og:determiner": "",
    "og:site_name": "Myspace",
    "og:image": "",
    "og:image:secure_url": "",
    "og:image:type": "",
    "og:image:width": "",
    "og:image:height": "",
    "twitter:title": "",
    "twitter:description": "",
    "twitter:image": "",
    "twitter:image:alt": "",
    "twitter:card": "",
    "twitter:site": "",
    "twitter:site:id": "",
    "twitter:url": "",
    "twitter:account_id": "",
    "twitter:creator": "",
    "twitter:creator:id": "",
    "twitter:player": "",
    "twitter:player:width": "",
    "twitter:player:height": "",
    "twitter:player:stream": "",
    "twitter:app:name:iphone": "",
    "twitter:app:id:iphone": "",
    "twitter:app:url:iphone": "",
    "twitter:app:name:ipad": "",
    "twitter:app:id:ipad": "",
    "twitter:app:url:ipad": "",
    "twitter:app:name:googleplay": "",
    "twitter:app:id:googleplay": "",
    "twitter:app:url:googleplay": "",
    "headings": [
      {
        "level": "h2",
        "text": "Discover"
      },
      {
        "level": "h2",
        "text": "Thom Yorke Surprise-Releases New Song ‘5.17’"
      },
      {
        "level": "h2",
        "text": "Charli XCX shares full ‘Crash’ track listing"
      },
      {
        "level": "h2",
        "text": "Fly Anakin Carves His Own Lane on Frank"
      },
      {
        "level": "h2",
        "text": "Rammstein share powerful new ballad ‘Zeit’ and unveil new album"
      },
      {
        "level": "h2",
        "text": "Deftones Part Ways With Bassist Sergio Vega"
      },
      {
        "level": "h2",
        "text": "Yeah Yeah Yeahs Tease First New Music in More Than Nine Years"
      },
      {
        "level": "h3",
        "text": "Date, Network, and Connect with People"
      },
      {
        "level": "h2",
        "text": "Listen to Damiano David’s uplifting new single ‘Born With A Broken Heart’"
      },
      {
        "level": "h2",
        "text": "Idris Elba is moving to Africa to support its film industry"
      },
      {
        "level": "h2",
        "text": "Here’s every song in ‘Venom: The Last Dance’"
      },
      {
        "level": "h2",
        "text": "Behind the Scenes of Mothica’s Newest Mental Health-Based Track, ‘Sensitive’"
      },
      {
        "level": "h2",
        "text": "Dolly Parton ‘Respectfully Bows Out’ of Rock Hall Nomination"
      },
      {
        "level": "h2",
        "text": "Bikini Kill Detail 2022 Summer Tour"
      },
      {
        "level": "h2",
        "text": "The Best in Music & Culture. All In One Place."
      },
      {
        "level": "h2",
        "text": "The Rolling Stones Announce 60th Anniversary Tour"
      },
      {
        "level": "h2",
        "text": "Yungblud Shares ‘The Funeral’ Video With Ozzy and Sharon Osbourne Cameo"
      },
      {
        "level": "h2",
        "text": "Flea Joins Nick Cave and Warren for Performance of ‘We No Who U R’"
      },
      {
        "level": "h2",
        "text": "George R.R. Martin gives update on ‘Game Of Thrones’ spin-offs"
      },
      {
        "level": "h2",
        "text": "Mike Cross, Founding Guitarist of Sponge, Dies at 57"
      },
      {
        "level": "h2",
        "text": "Black Keys Announce 11th Studio Album Dropout Boogie, Share ‘Wild Child’"
      },
      {
        "level": "h2",
        "text": "Myspace Exclusives"
      },
      {
        "level": "h3",
        "text": "GETTING NAILED"
      },
      {
        "level": "h4",
        "text": "Too Short - Getting Nailed"
      },
      {
        "level": "h3",
        "text": "THE PEDICAB INTERVIEWS"
      },
      {
        "level": "h4",
        "text": "The Pedicab Interviews: Chris Cole"
      },
      {
        "level": "h2",
        "text": "Florence + The Machine Announce Dance Fever, Release ‘My Love’"
      },
      {
        "level": "h2",
        "text": "How MGMT’s ‘Little Dark Age’ Became an Unstoppable TikTok Meme"
      },
      {
        "level": "h2",
        "text": "Pavement Unveil New Video for ‘Harness Your Hopes’"
      },
      {
        "level": "h2",
        "text": "Red Hot Chili Peppers, Nine Inch Nails, Slipknot and KISS to Headline Louder Than Life Lineup"
      },
      {
        "level": "h2",
        "text": "Florence Pugh in talks to star in ‘Dune: Part Two’"
      },
      {
        "level": "h2",
        "text": "The National’s new album has a “classic” sound with “a lot of energy”"
      },
      {
        "level": "h2",
        "text": "Bob Dylan Announces First New Book in 18 Years"
      },
      {
        "level": "h2",
        "text": "The Muppets series about Electric Mayhem Band in the works"
      },
      {
        "level": "h2",
        "text": "King Gizzard and the Lizard Wizard Tease First Double LP With 18-Minute Single"
      },
      {
        "level": "h2",
        "text": "Alanis Morissette Details Jagged Little Pill 25th Anniversary Tour"
      },
      {
        "level": "h2",
        "text": "Blink-182’s Travis Barker is developing a new reality TV series, ‘Inked And Iced’"
      },
      {
        "level": "h2",
        "text": "John Doe to Release New Solo Album"
      },
      {
        "level": "h2",
        "text": "Snoop Dogg joins esports outfit Faze Clan as a content creator"
      },
      {
        "level": "h2",
        "text": "The Weeknd to Appear on Upcoming Episode of The Simpsons"
      },
      {
        "level": "h2",
        "text": "Arcade Fire continue to tease new material with sheet music and postcards"
      },
      {
        "level": "h2",
        "text": "Wage War on Their Rise and the Importance of Mental Health"
      },
      {
        "level": "h2",
        "text": "Watch Vince Staples’ Surrealist Video for ‘Magic’"
      },
      {
        "level": "h2",
        "text": "Sam Smith and Normani sued for “obvious” copyright infringement on collaboration"
      },
      {
        "level": "h2",
        "text": "Lady Gaga Announces Chromatica Ball Summer Stadium Tour"
      },
      {
        "level": "h2",
        "text": "‘Peaky Blinders’ fans celebrate Tom Hardy’s return as Alfie Solomons"
      },
      {
        "level": "h2",
        "text": "Phoebe Bridgers Shares Haunting Cover of Billie Eilish’s ‘When The Party’s Over’"
      },
      {
        "level": "h2",
        "text": "Dua Lipa reacts to Oscar Isaac fan-fiction story about her on ‘Saturday Night Live’"
      },
      {
        "level": "h2",
        "text": "A Portrait of the Artist as A Jung Man"
      },
      {
        "level": "h2",
        "text": "Pearl Jam’s Stone Gossard on Reviving Loosegroove Label: ‘I’m Still A Kid in the Sandbox’"
      },
      {
        "level": "h2",
        "text": "‘The Batman’: Post-credits tease features a secret Riddler message"
      },
      {
        "level": "h2",
        "text": "Red Hot Chili Peppers Share Latest Single ‘Poster Child’"
      },
      {
        "level": "h2",
        "text": "James Gunn supports Pete Davidson after Kanye West’s controversial ‘Eazy’ video"
      },
      {
        "level": "h2",
        "text": "Kevin Morby Announces New Album This Is A Photograph"
      },
      {
        "level": "h2",
        "text": "‘The Boys’ actor Antony Starr gets suspended prison sentence after assault in pub"
      },
      {
        "level": "h2",
        "text": "Madonna, Sickick and Fireboy DML Remix Her 1998 Hit ‘Frozen’"
      },
      {
        "level": "h2",
        "text": "The Lemonheads Headline Official SPIN SXSW Showcase With 30th Anniversary Set of It’s a Shame About Ray"
      },
      {
        "level": "h2",
        "text": "The Weeknd Details 2022 North American Stadium Tour Dates"
      },
      {
        "level": "h2",
        "text": "L’Eclair Are Jamming Their Way to Instrumental Bliss"
      },
      {
        "level": "h2",
        "text": "Jack White and Q-Tip Join Forces on New Single ‘Hi-De-Ho’"
      },
      {
        "level": "h2",
        "text": "Band of Horses Survived…Barely"
      },
      {
        "level": "h2",
        "text": "Brad Pitt takes on Bad Bunny in trailer for action thriller ‘Bullet Train’"
      },
      {
        "level": "h2",
        "text": "Belle and Sebastian to Release First Album in 7 Years, Listen to ‘Unnecessary Drama’"
      },
      {
        "level": "h2",
        "text": "John DiMaggio to return as Bender in ‘Futurama’ revival: “I’m back, baby!”"
      },
      {
        "level": "h2",
        "text": "The Offspring Detail U.S. Spring Tour"
      },
      {
        "level": "h2",
        "text": "Charli XCX tells critics of new single: “I’m living my best life – and that’s the tea”"
      },
      {
        "level": "h2",
        "text": "PUP Release ‘Matilda’ Off Upcoming Album"
      },
      {
        "level": "h2",
        "text": "King Hannah Isn’t Sorry"
      },
      {
        "level": "h2",
        "text": "‘The Batman’: Zoë Kravitz “interpreted” Catwoman as bisexual"
      },
      {
        "level": "h2",
        "text": "Bartees Strange Pays Homage to Loved Ones With A ‘Heavy Heart’"
      },
      {
        "level": "h2",
        "text": "‘South Park’ prepares for nuclear war in new promo clip"
      },
      {
        "level": "h2",
        "text": "Sharon Van Etten Shares New Single ‘Used to It’ and Accompanying Video"
      },
      {
        "level": "h2",
        "text": "Watch Avril Lavigne perform with Travis Barker and Blackbear on ‘Kimmel’"
      },
      {
        "level": "h2",
        "text": "Hear Wet Leg’s Upbeat New Song ‘Angelica’"
      },
      {
        "level": "h2",
        "text": "Roosevelt Gets Bodies Moving and Hearts Racing on Polydans"
      },
      {
        "level": "h2",
        "text": "Watch Maynard James Keenan try to play Jenga during a Tool show"
      },
      {
        "level": "h2",
        "text": "Bridget Everett Is Trying Her Best"
      },
      {
        "level": "h2",
        "text": "Ryan Reynolds opens up about struggling with anxiety"
      },
      {
        "level": "h2",
        "text": "Courtney Love Addresses Complicated Relationship With Mark Lanegan on Instagram, Deletes Post"
      },
      {
        "level": "h2",
        "text": "‘Euphoria’ sparks rise in young people seeking help for addiction"
      },
      {
        "level": "h2",
        "text": "LCD Soundsystem Go Deep Into Their Catalog in Second Saturday Night Live Performance"
      },
      {
        "level": "h2",
        "text": "‘Peaky Blinders’ cast hit Birmingham for season six premiere"
      },
      {
        "level": "h2",
        "text": "Bonnie Raitt Announces First Album in 6 Years, Share New Song ‘Made Up Mind’"
      },
      {
        "level": "h2",
        "text": "Megan Thee Stallion shares texts after Tory Lanez shooting"
      },
      {
        "level": "h2",
        "text": "Tears for Fears The Tipping Point"
      },
      {
        "level": "h2",
        "text": "Bloc Party share soaring new single ‘Sex Magik’"
      },
      {
        "level": "h2",
        "text": "On Blossoms’ New Album, Tom Ogden Needed to Lean into the Past to Move Forward"
      },
      {
        "level": "h2",
        "text": "With Love Sux, Avril Lavigne Cements Pop-Punk Legacy"
      },
      {
        "level": "h2",
        "text": "Watch Dave Grohl drink multiple shots and discuss his love of UFOs on ‘Hot Ones’"
      },
      {
        "level": "h2",
        "text": "O.N.E. The Duo Carve Their Own Path From Wu-Tang Roots to Country Music"
      },
      {
        "level": "h2",
        "text": "‘The Fairly OddParents’ live-action reboot trailer draws criticism: “Like a bad ‘SNL’ parody”"
      },
      {
        "level": "h2",
        "text": "Florence + The Machine Unveil Womanhood Anthem ‘King’"
      },
      {
        "level": "h2",
        "text": "‘What Lies In The Multiverse’ gets new M-rated trailer ahead of upcoming release"
      },
      {
        "level": "h2",
        "text": "Coldplay Cover Kid Cudi and Share New Version of ‘Let Somebody Go’ for Spotify Singles"
      },
      {
        "level": "h2",
        "text": "Tianna Esperanza Unveils Debut Single ‘Lewis’"
      },
      {
        "level": "h2",
        "text": "Johnny Knoxville reveals stunts ‘Jackass’ cast refuse to do"
      },
      {
        "level": "h2",
        "text": "Difficult Fun: February 2022’s Best Punk"
      },
      {
        "level": "h2",
        "text": "Watch Green Day drive around in a convertible in new “1972” music teaser"
      },
      {
        "level": "h2",
        "text": "Mark Lanegan Remembered: Iggy Pop, Peter Hook, Garbage, Greg Dulli and More Pay Tribute"
      },
      {
        "level": "h2",
        "text": "LCD Soundsystem announce Philadelphia and Boston residencies"
      },
      {
        "level": "h2",
        "text": "Sigur Rós Announce First Dates in Extensive World Tour, Kjartan Sveinsson Rejoins"
      },
      {
        "level": "h2",
        "text": "The Smashing Pumpkins Announce 11-Date U.S. Tour"
      },
      {
        "level": "h2",
        "text": "Florence + The Machine announce their return: “Something’s coming”"
      },
      {
        "level": "h2",
        "text": "Dua Lipa, My Chemical Romance, Green Day and Halsey to Headline Firefly Festival"
      },
      {
        "level": "h2",
        "text": "Idris Elba is planning on “leaning away” from acting to focus more on music"
      },
      {
        "level": "h2",
        "text": "Britney Spears Signs $15 Million Book Deal for Memoir"
      },
      {
        "level": "h2",
        "text": "‘Euphoria’: fans think Tom Holland has a secret cameo in new episode"
      },
      {
        "level": "h2",
        "text": "The Weeknd Unveils Fully Immersive Music Special, The Weeknd x The Dawn FM Experience"
      },
      {
        "level": "h3",
        "text": "Search Myspace"
      },
      {
        "level": "h2",
        "text": "You're now in slide show mode."
      },
      {
        "level": "h1",
        "text": "Sign in to Myspace"
      },
      {
        "level": "h1",
        "text": "Forgot your password?"
      },
      {
        "level": "h1",
        "text": "Password request sent"
      },
      {
        "level": "h2",
        "text": ""
      },
      {
        "level": "h1",
        "text": "Join Myspace"
      },
      {
        "level": "h1",
        "text": "Join with your email address"
      },
      {
        "level": "h1",
        "text": "You're almost ready..."
      },
      {
        "level": "h1",
        "text": "You're almost ready..."
      },
      {
        "level": "h4",
        "text": "Welcome to Myspace. Just start typing to find music."
      },
      {
        "level": "h5",
        "text": ""
      },
      {
        "level": "h6",
        "text": "Play Next"
      },
      {
        "level": "h6",
        "text": "Play Last"
      },
      {
        "level": "h6",
        "text": "Start Radio"
      },
      {
        "level": "h6",
        "text": "New Mix"
      },
      {
        "level": "h3",
        "text": "Connecting to your webcam."
      },
      {
        "level": "h6",
        "text": ""
      }
    ],
    "imgTags": [
      {
        "src": "https://content.myspacecdn.com/images03/30/8a09e233cd474d95a612b79fe3f4df37/300x300.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/1/2b69174db2ee4fc494f2667ca48f2820/300x300.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/10/7d1cfa40c19b457fb9da2a8c78a2112c/300x300.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/12/f0d10ec3ba46462980833898b9e3348e/300x300.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/9318d5bf18cc4e36988b51a63a2f9070/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/090e487e9e3c4403a789ba76a2ed669c/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/2ab6a5c086cd4796a0050c2065a2a08d/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/12/fd257fff4a5743098109d1878249b2f0/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/12/ad521e6cfd234a97b17639a9acbb75ab/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/2/2f1b3a0e2eea44c78ced4338bb93c654/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/8/62c7e1db20d8425c97250c1adc1d3780/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/4/e3c2a9a3db324025890e3bd048b963b5/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/8/5eba528b219443ffacdf1c4a6958ed3a/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/12/b165cd1d41594a57a00ff903fd4e1fb2/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/523b0e234b7b44f99e556f52b55be6c0/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/b2176637f8824a95bc4638a0d2227233/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/6/a812b34240054828bd39773f61259b17/640w.jpg",
        "alt": ""
      },
      {
        "src": "",
        "alt": ""
      },
      {
        "src": ""
      },
      {
        "src": "https://content.myspacecdn.com/images04/3/cf6f426bd7864dc698ca8eebcc66cba9/640w.jpg",
        "alt": ""
      },
      {
        "src": "",
        "alt": ""
      },
      {
        "src": ""
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/c486b6c8897c46c39d4c7cc2689f8894/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/86cecc36959444629806f5049fad1ed6/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/e2de025fefe8443d84a9414f3286066e/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/3/d0f820f5f0f04df1866f7fab1d247563/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images04/9/948b5e1091ea4169bf2e15cba00d4ffd/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/0e49b6c6b219419f8687b2299e1fd44a/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/12eabe82405d4d70bc4197eb4ced16ce/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/e27fa6be9d7148418ec08377d639af99/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/cf9bc2d9402e455eb351c08b8a9c05a5/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/06e426f8007f4b89b4acbea3b7090ae8/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/b8fb3da3d9164e278f04921827b6948d/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/bca73a5414be4d07a8f6280da89e180b/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/c4e044c951374002b750c4a8a86238ca/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/b93fea92ae1f48a99ec14bc52e317053/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/497b36f5bf6a4a34927f130f0fb10e65/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/96ddcdd8b7e949d9ac1d568a488c46bb/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/1cdde4b322b44c0c84bb765c6ef98554/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/3a591c8fc1cd4b329d0144122bcb9320/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/c5d8ab1c01e84bb286e535a36cc61d57/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/bbf36605a04a4cac86303d46ad17fe74/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/9741ba06dc194da99770b80ba2a928d5/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/9c89c58b61594a628301d23340db17ad/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/c78080636a9c4e4c9dae6d827255b01c/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/1ebf54eda24c40c4a2646385c2720e44/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/72369b92792a453f8eaa1d4347e53a87/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/23eb3d7fb6c74f0d841e8d0023eed599/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/fc744949d24d46e6baf830ca921634a8/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/31969c6cb733482fa0576d51d9e60f77/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/22e118b28b92451f93f2551476dde06c/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/4ec0b1f3095b4eb1ac97996cfd7a9811/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/307f98980dae4a3194476a210d797dca/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/59820823c75b459a83f84c008147c4dd/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/68abd6a2e0654dd9bd7af1928d1fc340/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/b7729020f8594730a94b5303f27d8361/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/13b0e6a116ef4acb89b5c05ab071a250/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/611eb5194e8c4fe1a3542641d51e21e4/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/066e482379084eacaaf3481ecec086ee/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/fee3bb16f94a474da540ff5a720f3c1b/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/81ba0822582941248a5e29dbf236e5dc/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/7edf416088864f88b9f976060b199793/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/45617ed02b884d6f9894f30fa5e79804/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/9c82f95520564d25811bfe0f94aee27b/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/0e124acca45b45228b192cb048f34f49/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/d420e5d2fba34348a0956cc4c8f2608b/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/660bed5f21f547be9730fbdb665baa48/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/9c33fed7657f4f18899e801f9ab732e2/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/93834fddf25f4ed6b66d52c2daa5ebb5/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/d1dc0798e1504220950c3610c53c623a/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/2f6189657b204d7caaa2b04348f61d78/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/272ea68c1a854f9b893669846bcff6a9/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/3c3f739e14b84b8892b656fdf5e55e33/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/d27025d999a646a68c98149eb44dc798/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/c87a6b392007469697ac3e19ce2f9448/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/150b153e396746c9a49f9faef2ec0b1e/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/6959d3e8c11e4f58b7fc3833fb56234e/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/15c7811cc6684ca29a68824475a78979/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/2ca92f27986040fa975a4247b2ba508f/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/e6c49c1917e243a59544760bb0de0bea/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/35e014b74ea7492e85c09ca92e16a329/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/672a6e4a9fb34b23ae50652512dcd914/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/ca011b437c724d23b0cba7f31a538846/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/88cd5a62e7d346ada76b8b2aa5118b7b/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/20d1fbd0d30b42e6a5524dc3db63f83f/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/123dc1c59a704917a6a61bb4d52a76f7/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/c191f318985f49e69d839f8d97b0a294/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/1597f8dfb26d4974a9e426f1a3468ee2/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/ea54328ee6c34450ab061374bc961252/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/cb1ea3c2873647f9883e812da51ee876/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/d52ad85c9a8b4dc9ad358376a81cd853/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/efab65c168f3472c96617cb9c873af6d/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/242b3262e4144c8aba9abc4684439228/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/9e7f8297bb0c43ec9b67e76a7eaad38e/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/d7607dd1a5f14c6eb5751f6cda4a7faf/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/d8984834515e4a04ba96b52576b9a51a/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/99f96de23b844987a2b431a8513c4ac8/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/830af16a791143358912339f78bb712f/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/2738edba810446ba8bd91196ad2beba1/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/163a0f76bc21461c99c5934e84d21afc/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/b9e36ead7cb14594a9dbf73b48eed747/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/b905fc6cbcde4753bdf7d03b3a6adb87/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/9092c90f19a845df9a809f2eb3c4883e/600x600.jpg"
      },
      {
        "src": "https://content.myspacecdn.com/images03/1/7fe125ca6ede46a0bfea52c2c915f837/600x600.jpg"
      },
      {
        "src": ""
      }
    ],
    "responseBody": "",
    "fb:app_id": "373499472709067",
    "msapplication-TileColor": "#313131",
    "msapplication-TileImage": "https://x.myspacecdn.com/new/common/images/favicons/tile.png",
    "p:domain_verify": "9069a95798cb530a18cfa50cec2757d1"
  }
}
```

---

## Customer Support

Need any assistance? [Get in touch with Customer Support](https://apiverve.com/contact).

---

## Updates
Stay up to date by following [@apiverveHQ](https://twitter.com/apiverveHQ) on Twitter.

---

## Legal

All usage of the APIVerve website, API, and services is subject to the [APIVerve Terms of Service](https://apiverve.com/terms) and all legal documents and agreements.

---

## License
Licensed under the The MIT License (MIT)

Copyright (&copy;) 2025 APIVerve, and EvlarSoft LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

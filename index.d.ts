declare module '@apiverve/metadataextractor' {
  export interface metadataextractorOptions {
    api_key: string;
    secure?: boolean;
  }

  export interface metadataextractorResponse {
    status: string;
    error: string | null;
    data: any;
    code?: number;
  }

  export default class metadataextractorWrapper {
    constructor(options: metadataextractorOptions);

    execute(callback: (error: any, data: metadataextractorResponse | null) => void): Promise<metadataextractorResponse>;
    execute(query: Record<string, any>, callback: (error: any, data: metadataextractorResponse | null) => void): Promise<metadataextractorResponse>;
    execute(query?: Record<string, any>): Promise<metadataextractorResponse>;
  }
}

export interface PopularChat {
  chartEntryViewResponses?: ChartEntryViewResponsesEntity[] | null;
}
export interface ChartEntryViewResponsesEntity {
  displayChart: DisplayChart;
  entries?: EntriesEntity[] | null;
  highlights?: HighlightsEntity[] | null;
}
export interface DisplayChart {
  date: string;
  chartMetadata: ChartMetadata;
  description: string;
}
export interface ChartMetadata {
  uri: string;
  alias: string;
  entityType: string;
  readableTitle: string;
  backgroundColor: string;
  textColor: string;
  dimensions: Dimensions;
}
export interface Dimensions {
  latestDate: string;
  earliestDate: string;
  country: string;
  chartType: string;
  recurrence: string;
}
export interface EntriesEntity {
  chartEntryData: ChartEntryData;
  trackMetadata?: TrackMetadata | null;
  albumMetadata?: AlbumMetadata | null;
  artistMetadata?: ArtistMetadata | null;
}
export interface ChartEntryData {
  currentRank: number;
  previousRank: number;
  entryStatus: string;
}
export interface TrackMetadata {
  trackName: string;
  trackUri: string;
  displayImageUri: string;
  artists?: ArtistsEntity[] | null;
}
export interface ArtistsEntity {
  name: string;
  spotifyUri: string;
}
export interface AlbumMetadata {
  albumName: string;
  albumUri: string;
  displayImageUri: string;
  artists?: ArtistsEntity[] | null;
}
export interface ArtistMetadata {
  artistName: string;
  artistUri: string;
  displayImageUri: string;
}
export interface HighlightsEntity {
  type: string;
  text: string;
  displayImageUri: string;
  backgroundColor: string;
  chartLabel: string;
  chartUri: string;
}

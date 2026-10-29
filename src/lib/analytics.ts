import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const analytics = new BetaAnalyticsDataClient();

export async function getAnalyticsOverview() {
  const [response] = await analytics.runReport({
    property: `properties/${process.env.GA4_PROPERTY_ID}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'activeUsers' },
      { name: 'sessions' },
    ],
  });

  return response;
}

const INGESTION_METHODS = [
  {
    title: "CRM Export",
    icon: "01",
    desc: "Export customer records from any CRM as CSV. Map your fields to the required column schema.",
    format: "customer_id, avg_order_value, total_orders, days_since_last_purchase, sessions_last_30d, support_tickets_90d, email_click_rate, discount_usage_rate",
  },
  {
    title: "Transaction Logs",
    icon: "02",
    desc: "Pull order history from your e-commerce platform. Aggregate to compute per-customer averages.",
    format: "Requires: SUM(total_orders), AVG(avg_order_value) per customer_id",
  },
  {
    title: "Analytics Platform",
    icon: "03",
    desc: "Session data from Google Analytics, Mixpanel, or Amplitude. Count sessions per customer in the last 30 days.",
    format: "Requires: COUNT(distinct sessions) per customer_id in 30d window",
  },
  {
    title: "Support System",
    icon: "04",
    desc: "Ticket data from Zendesk, Intercom, or Help Scout. Count tickets per customer in the last 90 days.",
    format: "Requires: COUNT(tickets) per customer_id in 90d window",
  },
  {
    title: "Email Platform",
    icon: "05",
    desc: "Engagement metrics from Mailchimp or SendGrid. Compute email_click_rate as clicks ÷ sends.",
    format: "Requires: SUM(clicks) / SUM(sends) per customer_id",
  },
  {
    title: "Promo System",
    icon: "06",
    desc: "Discount usage from your order system. Compute rate as discounted orders ÷ total orders.",
    format: "Requires: COUNT(discounted orders) / COUNT(total orders) per customer_id",
  },
];

const SCHEMA_ROWS = [
  { col: "customer_id", type: "string", example: "CUST-00991", source: "Any unique ID" },
  { col: "avg_order_value", type: "float", example: "1250.00", source: "Transactions" },
  { col: "total_orders", type: "integer", example: "5", source: "Transactions" },
  { col: "days_since_last_purchase", type: "integer", example: "68", source: "Transactions" },
  { col: "sessions_last_30d", type: "integer", example: "3", source: "Analytics" },
  { col: "support_tickets_90d", type: "integer", example: "2", source: "Support" },
  { col: "email_click_rate", type: "float (0–1)", example: "0.12", source: "Email" },
  { col: "discount_usage_rate", type: "float (0–1)", example: "0.35", source: "Promotions" },
];

export default function DataSources() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-light text-[#e8edf5]">Data Sources</h1>
        <p className="mt-1.5 text-sm text-[#6b7a8f]">
          The engine works with any customer data. Here is how to connect yours.
        </p>
      </div>

      <section className="mb-16">
        <div className="mb-8">
          <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">Source Systems</span>
          <h2 className="mt-2 text-xl font-light text-[#e8edf5]">Ingestion methods</h2>
        </div>
        <div className="space-y-px">
          {INGESTION_METHODS.map((item) => (
            <div
              key={item.title}
              className="bg-[#0f1424] p-5 transition hover:bg-[#161c30]"
            >
              <div className="flex items-start gap-4">
                <span className="text-sm font-medium text-[#4a6fa5] shrink-0 w-6">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-[#e8edf5]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b7a8f]">{item.desc}</p>
                  <p className="mt-2 text-xs text-[#4a5568]">{item.format}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8">
          <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">Schema</span>
          <h2 className="mt-2 text-xl font-light text-[#e8edf5]">Required columns</h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-[#1e2640]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e2640] bg-[#0f1424]">
                <th className="px-4 py-3 font-medium text-[#4a5568] uppercase tracking-wider">Column</th>
                <th className="px-4 py-3 font-medium text-[#4a5568] uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 font-medium text-[#4a5568] uppercase tracking-wider">Example</th>
                <th className="px-4 py-3 font-medium text-[#4a5568] uppercase tracking-wider">Source</th>
              </tr>
            </thead>
            <tbody>
              {SCHEMA_ROWS.map((c) => (
                <tr key={c.col} className="border-b border-[#161c30] last:border-0">
                  <td className="px-4 py-3 text-[#4a6fa5]">{c.col}</td>
                  <td className="px-4 py-3 text-[#6b7a8f]">{c.type}</td>
                  <td className="px-4 py-3 text-[#4a5568]">{c.example}</td>
                  <td className="px-4 py-3 text-[#6b7a8f]">{c.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8">
          <span className="text-xs tracking-[0.2em] text-[#4a5568] uppercase">Processing</span>
          <h2 className="mt-2 text-xl font-light text-[#e8edf5]">Feature engineering</h2>
        </div>
        <div className="space-y-4">
          <div className="border-l-2 border-[#4a6fa5] bg-[#0f1424] px-5 py-4">
            <code className="text-sm text-[#7a99c4]">customer_value = avg_order_value × total_orders</code>
            <p className="mt-1.5 text-sm text-[#6b7a8f]">Total lifetime value of the customer.</p>
          </div>
          <div className="border-l-2 border-[#4a6fa5] bg-[#0f1424] px-5 py-4">
            <code className="text-sm text-[#7a99c4]">engagement_score = sessions_last_30d × 0.7 + email_click_rate × 10</code>
            <p className="mt-1.5 text-sm text-[#6b7a8f]">Weighted composite of session activity and email engagement.</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-[#4a5568]">
          Training and inference share the same feature code — consistent from development to production.
        </p>
      </section>

      <section className="rounded-lg border border-[#1e2640] bg-[#0f1424] p-6">
        <h2 className="text-sm font-medium text-[#b0c4de]">Sample data</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6b7a8f]">
          The project ships with a synthetic data generator that produces 2,500 realistic
          customer records. This lets you run the full pipeline without connecting to real
          sources. When ready, replace the CSV with data from your own systems following
          the same schema.
        </p>
      </section>
    </div>
  );
}

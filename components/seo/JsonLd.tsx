/**
 * <JsonLd /> — server component that renders a JSON-LD <script> tag
 * directly into the initial HTML response. Use this instead of the
 * existing client `StructuredData` component for schemas that crawlers
 * (especially LLM crawlers) need at first paint without waiting for
 * `afterInteractive` script injection.
 *
 * Usage:
 *   <JsonLd data={generatePersonJsonLd()} />
 *   <JsonLd dataBlocks={[personJson, websiteJson]} />
 */

interface SingleProps {
  data: Record<string, unknown>;
  dataBlocks?: undefined;
}
interface MultipleProps {
  data?: undefined;
  dataBlocks: Array<Record<string, unknown>>;
}

export function JsonLd(props: SingleProps | MultipleProps) {
  const blocks = props.dataBlocks ?? (props.data ? [props.data] : []);
  return (
    <>
      {blocks.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}

import AppBreadcrumb from "./AppBreadcrumb";

interface PlatformBreadcrumbProps {
  layerNumber: number;
  layerName: string;
}

const PlatformBreadcrumb = ({ layerNumber, layerName }: PlatformBreadcrumbProps) => (
  <AppBreadcrumb
    crumbs={[
      { labelId: "breadcrumb.capabilityStack", path: "/platform-config" },
      { labelId: `__literal:L${layerNumber}: ${layerName}` },
    ]}
  />
);

export default PlatformBreadcrumb;

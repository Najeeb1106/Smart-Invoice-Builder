import React from 'react';
import { InvoiceData, TemplateId } from '../../types/invoice';
import { ModernTemplate } from './designs/ModernTemplate';
import { ClassicTemplate } from './designs/ClassicTemplate';
import { MinimalTemplate } from './designs/MinimalTemplate';
import { ExecutiveTemplate } from './designs/ExecutiveTemplate';
import { CorporateBlueTemplate } from './designs/CorporateBlueTemplate';
import { ProfessionalGrayTemplate } from './designs/ProfessionalGrayTemplate';
import { FreelancerMinimalTemplate } from './designs/FreelancerMinimalTemplate';
import { CreativeStudioTemplate } from './designs/CreativeStudioTemplate';
import { DeveloperInvoiceTemplate } from './designs/DeveloperInvoiceTemplate';
import { RetailClassicTemplate } from './designs/RetailClassicTemplate';
import { ServiceProTemplate } from './designs/ServiceProTemplate';
import { ConsultantTemplate } from './designs/ConsultantTemplate';

export interface TemplateRendererProps {
  invoice: InvoiceData;
  templateId?: TemplateId;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  invoice,
  templateId,
}) => {
  const selectedTemplate = templateId || invoice.template || 'modern';

  switch (selectedTemplate) {
    case 'modern':
      return <ModernTemplate invoice={invoice} />;
    case 'classic':
      return <ClassicTemplate invoice={invoice} />;
    case 'minimal':
      return <MinimalTemplate invoice={invoice} />;
    case 'executive':
      return <ExecutiveTemplate invoice={invoice} />;
    case 'corporate-blue':
      return <CorporateBlueTemplate invoice={invoice} />;
    case 'professional-gray':
      return <ProfessionalGrayTemplate invoice={invoice} />;
    case 'freelancer-minimal':
      return <FreelancerMinimalTemplate invoice={invoice} />;
    case 'creative-studio':
      return <CreativeStudioTemplate invoice={invoice} />;
    case 'developer':
      return <DeveloperInvoiceTemplate invoice={invoice} />;
    case 'retail-classic':
      return <RetailClassicTemplate invoice={invoice} />;
    case 'service-pro':
      return <ServiceProTemplate invoice={invoice} />;
    case 'consultant':
      return <ConsultantTemplate invoice={invoice} />;
    default:
      return <ModernTemplate invoice={invoice} />;
  }
};

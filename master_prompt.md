============================================================
SMART INVOICE BUILDER
MASTER PRODUCT + ENGINEERING SPECIFICATION
VERSION 3.0
============================================================

ROLE
============================================================

You are the Lead Product Engineer, Senior Frontend Architect,
Senior UI/UX Designer, Design Systems Engineer, and QA Engineer.

You are building a completely new product called:

SMART INVOICE BUILDER

This is a FROM-SCRATCH implementation.

Do not reuse or migrate any previous Smart Invoice Builder
codebase, components, styles, state architecture, or design.

Build the product as if no previous implementation exists.

The goal is not merely to make an invoice generator work.

The goal is to build a polished, modern, professional product
that users would genuinely trust and enjoy using.

============================================================
1. PRODUCT DEFINITION
============================================================

Smart Invoice Builder is a privacy-focused, local-first
invoice creation web application.

Users can:

- browse professional invoice templates
- preview templates visually
- select a template
- enter business information
- enter customer information
- create invoice items
- configure invoice dates and currency
- apply discounts and tax
- add notes and payment terms
- see a live invoice preview
- save invoice data locally
- download a professional PDF
- print the invoice
- start a new invoice

No account is required for the core experience.

No backend is required for the first version.

Invoice data remains in the user's browser.

============================================================
2. CORE PRODUCT EXPERIENCE
============================================================

The primary journey is:

LANDING PAGE
      ↓
TEMPLATE GALLERY
      ↓
VISUAL TEMPLATE PREVIEW
      ↓
USE TEMPLATE
      ↓
INVOICE BUILDER
      ↓
ENTER DETAILS
      ↓
LIVE PREVIEW
      ↓
DOWNLOAD PDF / PRINT
      ↓
NEW INVOICE

Every step should be obvious to a first-time user.

The user should never need documentation to understand
how to create an invoice.

============================================================
3. NON-NEGOTIABLE RULES
============================================================

1. Build from scratch.

2. Do not copy an old implementation.

3. Do not create duplicate state systems.

4. Do not duplicate calculation logic.

5. Do not hardcode calculated totals.

6. Do not use browser-default form controls in the final UI.

7. Do not create fake template thumbnails.

8. Do not create 12 templates that are merely color variations.

9. Do not create a giant vertically scrolling invoice form.

10. Do not put builder actions in a large bottom action bar.

11. Do not place the marketing footer inside the builder.

12. Do not claim "production ready" because the build passes.

13. Do not commit or push to GitHub automatically.

14. Do not silently ignore errors.

15. Fix root causes rather than hiding problems with CSS.

16. Do not add unnecessary dependencies.

17. Do not introduce a backend without a real product requirement.

18. Do not sacrifice usability for visual effects.

19. Do not sacrifice correctness for speed of implementation.

20. If a requirement is ambiguous, choose the solution that
best matches the product specification and professional UX.

============================================================
4. TECHNOLOGY
============================================================

Preferred stack:

- React
- Vite
- TypeScript
- modern CSS
- Lucide icons

Use:

- jsPDF
- html2canvas only where appropriate
- browser print API
- localStorage

Use a modular architecture.

Recommended:

src/
  components/
  pages/
  layouts/
  templates/
  state/
  hooks/
  utils/
  services/
  data/
  styles/
  tests/

Keep business logic separate from presentation.

============================================================
5. ROUTES
============================================================

/

Landing page

/templates

Template marketplace

/create

Invoice builder

/features

Product features

/about

About

/contact

Contact

Marketing pages use the normal website shell.

The /create route uses a dedicated application shell.

============================================================
6. BRAND & DESIGN DIRECTION
============================================================

Brand:

Smart Invoice Builder

Personality:

Modern
Professional
Trustworthy
Simple
Fast
Privacy-focused

Design direction:

Premium modern SaaS.

The product should feel closer to:

- modern productivity software
- professional document software
- premium SaaS
- document design tools

It should NOT feel like:

- Bootstrap
- generic admin dashboard
- student project
- basic HTML
- generic AI-generated landing page

============================================================
7. DESIGN TOKENS
============================================================

Create centralized design tokens.

COLOR SYSTEM:

Primary:
#4F46E5

Primary Dark:
#3730A3

Primary Light:
#EEF2FF

Text Primary:
#111827

Text Secondary:
#4B5563

Text Muted:
#6B7280

Background:
#F8FAFC

Surface:
#FFFFFF

Border:
#E5E7EB

Success:
#16A34A

Warning:
#D97706

Danger:
#DC2626

Do not randomly introduce unrelated colors.

TYPOGRAPHY:

Preferred:
Inter

Fallback:
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
sans-serif

Use a clear hierarchy:

Display
H1
H2
H3
Body
Small
Caption

SPACING:

Use a consistent 4px-based spacing scale.

4
8
12
16
20
24
32
40
48
64

Do not randomly mix arbitrary spacing values.

RADII:

Small controls:
8px

Inputs:
10px

Cards:
14px

Large surfaces:
16px

Do not turn everything into pill-shaped UI.

SHADOWS:

Use subtle shadows.

Avoid heavy floating-card effects.

============================================================
8. GLOBAL NAVBAR
============================================================

Desktop:

Logo
Smart Invoice Builder

Home
Templates
Features
About
Contact

Primary CTA:

Create Invoice

Requirements:

- sticky
- compact
- responsive
- accessible
- subtle bottom border
- subtle shadow when scrolling
- clear active state

Mobile:

Use a proper hamburger menu.

The mobile menu must:

- trap focus when open
- close with Escape
- close after navigation
- expose an accessible label

============================================================
9. LANDING PAGE
============================================================

The landing page must communicate the product immediately.

------------------------------------------------------------
HERO
------------------------------------------------------------

Badge:

100% Free · Privacy Focused

Headline:

Create Professional Invoices
in Seconds

Supporting copy:

Create beautiful invoices for freelancers, businesses,
agencies, consultants, retailers, service providers,
and more.

Primary:

Create Free Invoice

Secondary:

Browse Templates

Right side:

REAL invoice preview.

Do not create a fake rectangle pretending to be an invoice.

Use the actual template rendering system with sample data.

Sample:

CODRIX DEV

Customer:
Najeeb Tahir

Laptop:
2 × $500

Mouse:
3 × $20

Subtotal:
$1,060

Discount:
-$106

Tax:
$47.70

Grand Total:
$1,001.70

The hero preview should visually resemble the actual
invoice produced by the builder.

------------------------------------------------------------
BENEFITS
------------------------------------------------------------

Create in Seconds

Professional Templates

PDF Export & Print

Privacy First

------------------------------------------------------------
TEMPLATE SHOWCASE
------------------------------------------------------------

Display 6 real templates.

The previews must come from the same template system
used by the builder.

------------------------------------------------------------
HOW IT WORKS
------------------------------------------------------------

01 Choose Template

02 Enter Details

03 Customize & Calculate

04 Download or Print

------------------------------------------------------------
INDUSTRIES
------------------------------------------------------------

Freelancer
Retail
Restaurant
Construction
Consultant
Agency
Real Estate
Education
Healthcare
Photography
IT & Software
Beauty & Salon

------------------------------------------------------------
FINAL CTA
------------------------------------------------------------

Ready to create your first invoice?

Create Free Invoice

============================================================
10. TEMPLATE MARKETPLACE
============================================================

The template gallery is a major product feature.

Header:

Professional Invoice Templates

Subtitle:

Choose a design that fits your business.

Search:

Search templates...

Filters:

All
Corporate
Freelancer
Services
Agency
IT & Software
Retail
Creative

Grid:

Desktop: 3 columns
Tablet: 2 columns
Mobile: 1 column

Each card contains:

1. Real invoice preview
2. Template name
3. Category
4. Short description
5. Preview
6. Use Template

Card states:

Default
Hover
Focused
Selected

============================================================
11. TEMPLATE THUMBNAIL ARCHITECTURE
============================================================

This is NON-NEGOTIABLE.

Template thumbnails must represent the actual template design.

Do NOT manually create a separate fake thumbnail design.

Preferred approach:

Use the same template renderer with a sample invoice state,
then render it inside a scaled preview container.

Conceptually:

<TemplateRenderer
  invoice={sampleInvoice}
  template={templateId}
/>

Then apply visual scaling for the gallery.

The gallery preview and builder preview must use the same
template design system.

This guarantees:

Gallery
=
Builder
=
PDF
=
Print

Do not create separate visual implementations unless
absolutely necessary for performance.

============================================================
12. REQUIRED TEMPLATES
============================================================

Create at least 12 genuinely different templates.

1. Modern

Contemporary SaaS.
Indigo accent.
Strong hierarchy.
Balanced whitespace.

2. Classic

Traditional professional invoice.
Formal typography.
Structured borders.
Strong totals.

3. Minimal

Ultra-clean.
Thin dividers.
Large whitespace.
Elegant typography.

4. Executive

Premium corporate.
Dark header.
Gold/amber accent.
Executive feel.

5. Corporate Blue

Deep navy.
Structured sections.
Professional corporate table.

6. Professional Gray

Neutral gray.
Hairline rules.
Consulting aesthetic.

7. Freelancer Minimal

Personal-brand focused.
Simple.
Clean.
Identity-forward.

8. Creative Studio

Creative agency.
Bold identity.
Distinctive accent areas.

9. Developer Invoice

Technology aesthetic.
Monospace metadata.
Technical details.

10. Retail Classic

Compact retail invoice.
Dense but readable.
Receipt-inspired.

11. Service Pro

Service-business focused.
Project summary.
Terms section.

12. Consultant

Executive letterhead.
Statement-style summary.
Premium consulting aesthetic.

============================================================
13. TEMPLATE SWITCHING
============================================================

Changing the template must NEVER delete or alter invoice data.

Example:

User creates invoice using Modern.

Then selects Corporate Blue.

The following must remain unchanged:

Business
Customer
Invoice number
Dates
Currency
Items
Quantities
Prices
Discount
Tax
Notes
Terms
Logo

ONLY the visual template changes.

============================================================
14. CENTRAL INVOICE DATA MODEL
============================================================

Use one centralized invoice state.

Example:

invoice = {

  business: {
    name,
    email,
    phone,
    address,
    taxNumber,
    logo
  },

  customer: {
    name,
    email,
    phone,
    address
  },

  details: {
    invoiceNumber,
    currency,
    invoiceDate,
    dueDate,
    paymentTerms
  },

  items: [
    {
      id,
      description,
      quantity,
      price
    }
  ],

  discountPercent,
  taxPercent,

  notes,
  terms,

  template
}

Do not create independent state objects for preview,
PDF, thumbnails, or printing.

============================================================
15. INVOICE NUMBER
============================================================

Generate invoice numbers automatically.

Format:

INV-YYYYMMDD-XXX

Example:

INV-20260813-001

The sequence number must be persisted locally.

When a new invoice is created:

increment the local sequence.

The invoice number must remain editable by the user.

Do not overwrite a user-edited invoice number during
ordinary state updates.

============================================================
16. CURRENCY FORMATTING
============================================================

Supported currencies:

USD
PKR
EUR
GBP
AED
SAR

Currency changes:

- symbol
- currency code where displayed
- formatting

Currency changes MUST NOT convert or mutate numeric values.

Use consistent monetary formatting.

Example:

USD:
$1,001.70

PKR:
₨1,001.70

Use thousands separators.

Default:
2 decimal places.

For currencies requiring different conventions,
use a centralized formatter.

Never implement currency formatting independently
inside individual templates.

============================================================
17. INVOICE BUILDER
============================================================

The builder is a dedicated application workspace.

It must NOT look like a marketing page.

It must NOT be a giant scrolling form.

Desktop:

TOP TOOLBAR

LEFT:
Section navigation + editor

RIGHT:
Sticky invoice preview

============================================================
18. BUILDER TOOLBAR
============================================================

Left:

← Back to Templates

Center:

Invoice Builder

Template:
Modern

Change

Right:

Save
Print
Download PDF
New Invoice

Priority:

Download PDF = Primary
Print = Secondary
Save = Secondary
New Invoice = Destructive/Ghost

No large bottom action bar.

============================================================
19. TEMPLATE CHANGE FLOW
============================================================

Clicking "Change" opens a template selection modal.

The modal should:

- show real template thumbnails
- support categories
- allow search
- show currently selected template
- provide Cancel
- provide Use Template

Changing the template immediately updates the live preview.

Invoice data remains untouched.

============================================================
20. BUILDER SECTION NAVIGATION
============================================================

Sections:

Business
Company details & logo

Customer
Billing details & contact

Invoice Details
Number, dates & currency

Items
Products & services

Discount & Tax
Adjust totals

Notes & Terms
Additional information

Each section:

Icon
Title
Description
Completion indicator

Completion should reflect meaningful required fields.

Example:

Business is complete when Business Name exists.

Customer is complete when Customer Name exists.

Invoice Details is complete when Invoice Number,
Currency and Invoice Date exist.

Items is complete when at least one valid item exists.

Discount & Tax is complete when values are valid.

Notes & Terms is optional and should not block completion.

Do not require optional fields.

============================================================
21. SECTION NAVIGATION BEHAVIOR
============================================================

Clicking a section switches the editor content.

Do not navigate to another page.

Do not lose unsaved data.

Validation:

Validate fields on blur and before final export.

Do not aggressively show errors while the user is typing.

When leaving a section containing invalid required data,
show a subtle completion/error indicator.

Do not prevent navigation between sections merely because
a field is incomplete.

PDF export should validate required fields and clearly
identify what needs to be fixed.

============================================================
22. BUSINESS SECTION
============================================================

Fields:

Business Name
Email
Phone
Address
Tax/VAT Number

Business Name is required.

Logo:

Professional drag/drop upload.

Accepted:

PNG
JPG
JPEG
WebP

Maximum:

5 MB

On upload:

- validate type
- validate size
- preview
- compress/resize if necessary
- store an optimized representation

Do not blindly store huge original images in localStorage.

After upload:

Replace
Remove

Errors:

Unsupported file type:
"Please upload a PNG, JPG, JPEG, or WebP image."

Too large:
"Logo must be smaller than 5 MB."

============================================================
23. CUSTOMER SECTION
============================================================

Fields:

Customer Name
Email
Phone
Address

Customer Name is required.

Desktop:
Two columns.

Mobile:
Single column.

============================================================
24. INVOICE DETAILS
============================================================

Fields:

Invoice Number
Currency
Invoice Date
Due Date
Payment Terms

Invoice Number:
required and editable.

Invoice Date:
defaults to current date.

Due Date:
optional.

Payment Terms:
optional.

============================================================
25. ITEMS
============================================================

Use a compact inline-editable table.

Columns:

Description
Quantity
Unit Price
Total
Action

Desktop:
table layout.

Mobile:
convert each item into a compact card/stacked row.

Do not force users to horizontally scroll an unusable table.

Add Item:

Creates a new item.

Default:

quantity = 1
price = 0

At least one item should remain.

Do not allow deleting the final item.

Validation:

quantity >= 0
price >= 0

============================================================
26. DISCOUNT & TAX
============================================================

Discount:

0–100%

Tax:

0–100%

Display:

Subtotal
Discount
Taxable Amount
Tax
Grand Total

Grand Total must have the strongest visual hierarchy.

============================================================
27. NOTES & TERMS
============================================================

Optional:

Notes
Payment Terms

Use professional textareas.

Do not make optional fields appear required.

============================================================
28. SAVE VS AUTOSAVE
============================================================

Autosave:

Persist invoice state automatically after meaningful changes.

Debounce persistence to avoid excessive localStorage writes.

Save button:

Explicitly saves the current state immediately.

Show toast:

"Invoice saved"

The Save button is therefore a manual confirmation action,
not the only way data is persisted.

============================================================
29. LOCAL STORAGE
============================================================

Persist:

Invoice state
Invoice sequence number
Selected template

Handle localStorage failures gracefully.

If storage quota is exceeded:

Show:

"Your invoice could not be saved locally. Try removing
the uploaded logo or reducing its size."

Never crash the application.

============================================================
30. NEW INVOICE
============================================================

When current invoice contains meaningful data:

Show confirmation dialog.

Message:

"Start a new invoice?
Your current invoice data will be cleared."

Actions:

Cancel
Start New Invoice

After confirmation:

- clear current invoice
- generate new invoice number
- reset dates
- reset items
- reset discount
- reset tax
- remove logo
- restore default currency
- restore default template or preserve selected template,
  according to the user's current builder context

No stale state may remain.

============================================================
31. CALCULATION ENGINE
============================================================

Use pure functions.

Subtotal:

SUM(quantity × price)

Discount:

Subtotal × discountPercent / 100

Taxable:

Subtotal - Discount

Tax:

Taxable × taxPercent / 100

Grand Total:

Taxable + Tax

Mandatory test:

Laptop:
2 × $500 = $1,000

Mouse:
3 × $20 = $60

Subtotal:
$1,060

Discount:
10% = $106

Taxable:
$954

Tax:
5% = $47.70

Grand Total:
$1,001.70

============================================================
32. TESTING REQUIREMENT
============================================================

Create automated unit tests for:

- subtotal calculation
- discount calculation
- taxable amount
- tax calculation
- grand total
- zero values
- maximum discount
- maximum tax
- multiple items
- empty item descriptions
- decimal quantities/prices where supported

Critical state transitions should also have tests where practical.

Manual browser QA remains mandatory.

Automated tests do NOT replace browser QA.

============================================================
33. LIVE PREVIEW
============================================================

The preview must resemble the final document.

Use:

A4 ratio
White page
Subtle shadow
Professional typography
Real spacing

Include:

Logo
Business information
Customer information
Invoice metadata
Line items
Subtotal
Discount
Tax
Grand Total
Notes
Terms

The preview updates immediately after state changes.

============================================================
34. STICKY PREVIEW BEHAVIOR
============================================================

Desktop:

The preview panel remains sticky within the viewport.

If the invoice is taller than the available viewport,
the preview panel may scroll internally.

Do not make the entire page awkwardly scroll.

The editor should be independently navigable.

Mobile:

Do not force sticky desktop behavior.

Place preview below the editor or provide a clear
Preview mode/toggle.

============================================================
35. PDF GENERATION
============================================================

Generate professional A4 PDFs.

Requirements:

- high-resolution output
- correct dimensions
- professional margins
- current invoice state
- current template
- current logo
- correct calculations
- no stale state
- no clipping

If using html2canvas:

Use high-resolution rendering such as:

scale: 2

or higher where practical.

Do not blindly assume one canvas equals one PDF page.

Implement pagination for invoices that exceed one page.

Avoid splitting:

- table rows
- totals blocks
- headings
- critical sections

PDF output must be tested with:

1 item
2 items
10+ items
long descriptions
long business names
logo
notes
all templates

Show progress:

"Generating PDF..."

Success:

"PDF downloaded successfully."

Failure:

"Unable to generate the PDF. Please try again."

============================================================
36. PRINT
============================================================

Use native browser print.

Print only the invoice.

Hide:

Navbar
Builder toolbar
Sidebar
Editor
Buttons
Footer
Marketing content

Preserve:

Invoice
Template
Logo
Tables
Totals

Use:

@page

A4

Professional print margins.

Test:

Modern
Classic
Minimal
Executive
Corporate Blue
Professional Gray
Freelancer Minimal
Creative Studio
Developer Invoice
Retail Classic
Service Pro
Consultant

============================================================
37. DESIGN SYSTEM
============================================================

All UI must use centralized design tokens.

No random values.

No default browser styling.

Inputs:

44px height
10px radius
14px horizontal padding

Buttons:

40–44px height

Cards:

14–16px radius

Spacing:

4px scale

Focus:

2–4px subtle indigo ring

Every component needs consistent:

default
hover
focus
active
disabled
error

states where appropriate.

============================================================
38. ACCESSIBILITY
============================================================

Target:

WCAG 2.1 AA principles.

Implement:

- semantic HTML
- correct heading hierarchy
- labels
- keyboard navigation
- visible focus
- aria-label
- aria-expanded
- aria-pressed
- aria-live for toast notifications
- focus management for modals
- Escape to close modals
- accessible mobile navigation
- sufficient contrast

Do not rely on color alone to communicate errors
or completion.

============================================================
39. ERROR HANDLING
============================================================

Handle:

Invalid required fields
Invalid quantity
Invalid price
Invalid discount
Invalid tax
Unsupported logo
Oversized logo
localStorage failure
PDF failure
Print limitations

Errors should be human-readable.

Never expose raw technical errors to users.

============================================================
40. EMPTY STATES
============================================================

Do not leave unexplained blank areas.

Examples:

No invoice items yet.

[ Add First Item ]

No templates found.

Try another search or category.

============================================================
41. LOADING STATES
============================================================

For operations that take time:

PDF generation
Image processing
Template loading

Show meaningful progress.

Buttons must prevent accidental double submission
during active operations.

============================================================
42. RESPONSIVE DESIGN
============================================================

Design intentionally for:

320px
375px
390px
414px
768px
1024px
1280px
1440px+

Desktop:

Sidebar + Editor + Preview

Tablet:

Compact navigation + Preview

Mobile:

Section navigation
Editor
Preview

Mobile builder requirements:

- no horizontal overflow
- no microscopic controls
- no unusable tables
- no giant fixed elements
- no inaccessible toolbar
- preview must remain readable

============================================================
43. PERFORMANCE
============================================================

Optimize:

rendering
state updates
localStorage writes
image processing
PDF generation

Debounce autosave.

Do not rerender the entire application unnecessarily
when a single input changes.

Do not store unnecessarily large assets.

============================================================
44. IMPLEMENTATION PHASES
============================================================

Execute in phases.

PHASE 1
Project foundation
Routing
Design tokens
Base components

PHASE 2
Invoice data model
State
Calculations
Validation
Tests

PHASE 3
Template engine
12 templates
Template preview system

PHASE 4
Landing page
Marketing pages
Navbar
Footer

PHASE 5
Template marketplace
Search
Filters
Preview
Template selection

PHASE 6
Invoice builder
Toolbar
Section navigation
Forms
Items
Calculations

PHASE 7
Live preview

PHASE 8
LocalStorage
Autosave
Save
New Invoice

PHASE 9
PDF
Print

PHASE 10
Responsive
Accessibility
Error handling

PHASE 11
Full QA

Do not skip QA between major phases.

============================================================
45. PHASE GATES
============================================================

Before moving to the next phase:

1. Build must pass.
2. No obvious console errors.
3. Current phase must work.
4. Browser inspection must be performed.
5. Major regressions must be fixed.

Do not continue building new features on top of
known broken functionality.

============================================================
46. VISUAL QA
============================================================

Open the actual application.

Inspect:

/
 /templates
 /create
 /features
 /about
 /contact

Check:

Typography
Spacing
Alignment
Hierarchy
Colors
Controls
Buttons
Cards
Template previews
Invoice preview
Responsive behavior

Ask:

Does this look professionally designed?

Does anything look like default HTML?

Does anything feel unfinished?

Is there excessive whitespace?

Is anything unnecessarily difficult to use?

Does the invoice look like a genuine professional document?

If the answer is NO:

FIX IT.

============================================================
47. FUNCTIONAL QA
============================================================

Test:

Business information
Customer information
Invoice details
Currency
Dates
Payment terms
Add item
Edit item
Remove item
Discount
Tax
Logo upload
Logo replacement
Logo removal
Template switching
Autosave
Manual Save
New Invoice
PDF
Print

Calculation:

2 × $500
3 × $20
10% discount
5% tax

Expected:

Subtotal = $1,060
Discount = -$106
Tax = $47.70
Grand Total = $1,001.70

============================================================
48. EDGE CASE QA
============================================================

Test:

Empty business name
Empty customer name
Zero quantity
Zero price
100% discount
100% tax
Long business name
Long customer name
Long address
Long item description
10+ items
Large logo
Invalid logo type
Oversized logo
Very small invoice
Multi-page invoice
Currency switching
Template switching
Browser refresh
New invoice after existing invoice
PDF immediately after editing
Print immediately after editing

============================================================
49. BROWSER QA
============================================================

Do not rely on:

npm run build

alone.

Required:

npm install
npm run build
start development server
open browser
test routes
test interactions
test responsive layouts
test PDF
test print
inspect console
fix problems
re-test

============================================================
50. GIT
============================================================

Do not:

git add
git commit
git push

until explicitly instructed.

============================================================
51. FINAL ACCEPTANCE CRITERIA
============================================================

The project is complete only when:

[ ] Product architecture complete
[ ] Design system complete
[ ] Landing page polished
[ ] Navbar polished
[ ] Footer polished
[ ] Template marketplace polished
[ ] Search/filter works
[ ] 12 templates exist
[ ] 12 templates are visually distinct
[ ] Real template thumbnails
[ ] Template preview works
[ ] Template switching preserves data
[ ] Builder workspace polished
[ ] Section navigation works
[ ] Forms work
[ ] Logo uploader works
[ ] Items work
[ ] Calculations work
[ ] Currency formatting works
[ ] Autosave works
[ ] Save works
[ ] New Invoice works
[ ] Live preview works
[ ] PDF works
[ ] Print works
[ ] Multi-page invoice works
[ ] Mobile works
[ ] Accessibility reviewed
[ ] Automated calculation tests pass
[ ] Browser QA completed
[ ] Console errors resolved
[ ] Production build passes

============================================================
52. FINAL PRODUCT STANDARD
============================================================

The final product should feel like:

A real professional invoice platform.

Not:

A form that generates PDFs.

The user should experience:

DISCOVER
    ↓
EXPLORE
    ↓
CHOOSE
    ↓
CREATE
    ↓
PREVIEW
    ↓
EXPORT

Every screen must feel intentional.

Every interaction must have feedback.

Every template must have a distinct visual identity.

Every calculation must be accurate.

Every important operation must handle errors gracefully.

Every responsive breakpoint must be usable.

The actual browser experience is the final authority.

A successful build does not equal a successful product.

============================================================
53. DEVELOPMENT BEHAVIOR
============================================================

For every phase:

INSPECT
↓
PLAN
↓
IMPLEMENT
↓
BUILD
↓
RUN
↓
BROWSER TEST
↓
VISUAL INSPECTION
↓
FIX
↓
RETEST
↓
PROCEED

Never report success without verification.

Never hide failures.

Never knowingly leave broken functionality behind
while moving to another feature.

============================================================
FINAL COMMAND
============================================================

BUILD SMART INVOICE BUILDER COMPLETELY FROM SCRATCH.

Start with the project foundation.

Build systematically.

Do not reuse previous code.

Do not commit or push.

Do not declare production readiness until all acceptance
criteria have been verified in the actual browser.

The final result must be:

MODERN
PROFESSIONAL
FAST
ACCESSIBLE
RESPONSIVE
PRIVATE
RELIABLE
VISUALLY POLISHED

============================================================
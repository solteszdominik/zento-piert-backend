import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const emailFrom = process.env.EMAIL_FROM;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface OrderEmailItem {
  product_name: string;
  unit: string;
  unit_price: number;
  quantity: number;
}

interface OrderEmailData {
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  message?: string | null;
  items: OrderEmailItem[];
}

function assertEmailConfigured() {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!emailFrom) {
    throw new Error("EMAIL_FROM is not configured");
  }
}

function assertAdminEmailConfigured() {
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not configured");
  }
}

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const createItemsHtml = (items: OrderEmailItem[]) => {
  return items
    .map((item) => {
      const lineTotal = item.unit_price * item.quantity;

      return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">
            ${escapeHtml(item.product_name)}
          </td>

          <td style="padding: 8px; border-bottom: 1px solid #ddd;">
            ${item.quantity} ${escapeHtml(item.unit)}
          </td>

          <td style="padding: 8px; border-bottom: 1px solid #ddd;">
            ${item.unit_price.toLocaleString("hu-HU")} Ft
          </td>

          <td style="padding: 8px; border-bottom: 1px solid #ddd;">
            ${lineTotal.toLocaleString("hu-HU")} Ft
          </td>
        </tr>
      `;
    })
    .join("");
};

export const emailService = {
  async sendOrderConfirmation(data: OrderEmailData) {
    assertEmailConfigured();

    const itemsHtml = createItemsHtml(data.items);

    return resend!.emails.send({
      from: emailFrom!,
      to: data.customer_email,
      subject: `Rendelés visszaigazolása – ${data.order_number}`,
      html: `
        <h2>Köszönjük a rendelését!</h2>

        <p>
          Kedves ${escapeHtml(data.customer_name)}!
        </p>

        <p>
          Rendelését sikeresen rögzítettük.
        </p>

        <p>
          <strong>Rendelésszám:</strong>
          ${escapeHtml(data.order_number)}
        </p>

        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px;">
                Termék
              </th>

              <th style="text-align: left; padding: 8px;">
                Mennyiség
              </th>

              <th style="text-align: left; padding: 8px;">
                Egységár
              </th>

              <th style="text-align: left; padding: 8px;">
                Összeg
              </th>
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p>
          <strong>Szállítási cím:</strong>
          ${escapeHtml(data.customer_address)}
        </p>

        ${
          data.message
            ? `
              <p>
                <strong>Megjegyzés:</strong>
                ${escapeHtml(data.message)}
              </p>
            `
            : ""
        }

        <p>
          Hamarosan feldolgozzuk rendelését.
        </p>

        <p>
          Üdvözlettel,<br />
          Zentó-Piért
        </p>
      `,
    });
  },

  async sendAdminOrderNotification(data: OrderEmailData) {
    assertEmailConfigured();
    assertAdminEmailConfigured();

    const itemsHtml = createItemsHtml(data.items);

    return resend!.emails.send({
      from: emailFrom!,
      to: adminEmail!,
      subject: `Új rendelés – ${data.order_number}`,
      html: `
        <h2>Új rendelés érkezett</h2>

        <p>
          <strong>Rendelésszám:</strong>
          ${escapeHtml(data.order_number)}
        </p>

        <p>
          <strong>Vásárló:</strong>
          ${escapeHtml(data.customer_name)}
        </p>

        <p>
          <strong>E-mail:</strong>
          ${escapeHtml(data.customer_email)}
        </p>

        <p>
          <strong>Telefon:</strong>
          ${escapeHtml(data.customer_phone)}
        </p>

        <p>
          <strong>Cím:</strong>
          ${escapeHtml(data.customer_address)}
        </p>

        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px;">
                Termék
              </th>

              <th style="text-align: left; padding: 8px;">
                Mennyiség
              </th>

              <th style="text-align: left; padding: 8px;">
                Egységár
              </th>

              <th style="text-align: left; padding: 8px;">
                Összeg
              </th>
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        ${
          data.message
            ? `
              <p>
                <strong>Megjegyzés:</strong>
                ${escapeHtml(data.message)}
              </p>
            `
            : ""
        }
      `,
    });
  },
};

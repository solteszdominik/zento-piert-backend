import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const emailFrom = process.env.EMAIL_FROM;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY");
}

if (!adminEmail) {
  throw new Error("Missing ADMIN_EMAIL");
}

if (!emailFrom) {
  throw new Error("Missing EMAIL_FROM");
}

const resend = new Resend(resendApiKey);

interface OrderEmailItem {
  product_name: string;
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

const createItemsHtml = (items: OrderEmailItem[]) => {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">
            ${item.product_name}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">
            ${item.quantity} db
          </td>
        </tr>
      `,
    )
    .join("");
};

export const emailService = {
  async sendOrderConfirmation(data: OrderEmailData) {
    const itemsHtml = createItemsHtml(data.items);

    return resend.emails.send({
      from: emailFrom,
      to: data.customer_email,
      subject: `Rendelés visszaigazolása – ${data.order_number}`,
      html: `
        <h2>Köszönjük a rendelését!</h2>

        <p>Kedves ${data.customer_name}!</p>

        <p>
          Rendelését sikeresen rögzítettük.
        </p>

        <p>
          <strong>Rendelésszám:</strong>
          ${data.order_number}
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
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p>
          <strong>Szállítási cím:</strong>
          ${data.customer_address}
        </p>

        <p>
          Hamarosan feldolgozzuk rendelését.
        </p>

        <p>Üdvözlettel,<br>Zentó-Piért</p>
      `,
    });
  },

  async sendAdminOrderNotification(data: OrderEmailData) {
    const itemsHtml = createItemsHtml(data.items);

    return resend.emails.send({
      from: emailFrom,
      to: adminEmail,
      subject: `Új rendelés – ${data.order_number}`,
      html: `
        <h2>Új rendelés érkezett</h2>

        <p>
          <strong>Rendelésszám:</strong>
          ${data.order_number}
        </p>

        <p>
          <strong>Vásárló:</strong>
          ${data.customer_name}
        </p>

        <p>
          <strong>E-mail:</strong>
          ${data.customer_email}
        </p>

        <p>
          <strong>Telefon:</strong>
          ${data.customer_phone}
        </p>

        <p>
          <strong>Cím:</strong>
          ${data.customer_address}
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
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        ${
          data.message
            ? `<p><strong>Megjegyzés:</strong> ${data.message}</p>`
            : ""
        }
      `,
    });
  },
};

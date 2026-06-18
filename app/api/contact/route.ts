import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, company, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, correo y mensaje son requeridos." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "NovaTech Web <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Nueva solicitud de cotización — ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8" /></head>
        <body style="margin:0;padding:0;background:#F8FAFC;font-family:'Inter',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#1D4ED8,#2563EB);padding:32px 40px;">
                    <p style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
                      ⚡ NovaTech<span style="color:#93C5FD;">.</span>
                    </p>
                    <p style="margin:8px 0 0;color:#BFDBFE;font-size:14px;">Nueva solicitud de cotización recibida</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:36px 40px;">
                    <p style="margin:0 0 24px;color:#0F172A;font-size:16px;font-weight:600;">
                      Hola, tienes una nueva solicitud 👋
                    </p>

                    <!-- Data rows -->
                    ${[
                      { label: "Nombre", value: name },
                      { label: "Empresa", value: company || "—" },
                      { label: "Correo", value: `<a href="mailto:${email}" style="color:#2563EB;">${email}</a>` },
                      { label: "Teléfono", value: phone || "—" },
                    ]
                      .map(
                        ({ label, value }) => `
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                        <tr>
                          <td width="120" style="color:#64748B;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:12px 16px;background:#F8FAFC;border-radius:8px 0 0 8px;">${label}</td>
                          <td style="color:#0F172A;font-size:14px;padding:12px 16px;background:#F1F5F9;border-radius:0 8px 8px 0;">${value}</td>
                        </tr>
                      </table>`
                      )
                      .join("")}

                    <!-- Message -->
                    <p style="margin:24px 0 8px;color:#64748B;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Mensaje</p>
                    <div style="background:#F8FAFC;border-left:4px solid #2563EB;border-radius:0 8px 8px 0;padding:16px 20px;color:#334155;font-size:14px;line-height:1.7;">
                      ${message.replace(/\n/g, "<br/>")}
                    </div>

                    <!-- CTA -->
                    <div style="margin-top:32px;text-align:center;">
                      <a href="mailto:${email}?subject=Re: Tu solicitud en NovaTech Solutions"
                        style="display:inline-block;background:#2563EB;color:#fff;font-size:14px;font-weight:600;padding:14px 28px;border-radius:10px;text-decoration:none;">
                        Responder a ${name}
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#F1F5F9;padding:20px 40px;text-align:center;">
                    <p style="margin:0;color:#94A3B8;font-size:12px;">
                      Este mensaje fue enviado desde el formulario de contacto de
                      <strong style="color:#64748B;">novatechsolutions.com</strong>
                    </p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json(
      { error: "Error interno al enviar el correo." },
      { status: 500 }
    );
  }
}

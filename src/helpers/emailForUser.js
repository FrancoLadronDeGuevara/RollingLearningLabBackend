const whitelist = require("../config/whitelist");

const emailForUser = (user, verificationLink) => {
  return `
    <table bgcolor="#f5f5f5" align="center" style="width:100%!important;table-layout:fixed">
        <tbody><tr>
            <td style="padding-bottom:20px">
                <table style="max-width:600px;margin:auto" align="center" border="0" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#f5f5f5" style="background-color:#f5f5f5">
                                <tbody><tr>
                                    <td align="center" style="padding-top:40px;padding-bottom:20px;text-align:center;background-color:#f5f5f5" width="100%">
                                        <a href="${whitelist[0]}" title="Rolling Learning Lab: verificación de email" style="color:#ffffff;text-decoration:none;font-family:'Arial';font-size:23px" target="_blank" >
                                            <b>
                                                <i style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                                                    <font color="#353e4a">
                                                        Rolling Learning Lab
                                                    </font>
                                                </i>
                                            </b>
                                        </a>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#353e4a;font-family:Arial,sans-serif;font-size:15px">
                                <tbody><tr>
                                    <td style="font-size:22px;color:#1469aa;text-align:center;line-height:26px;padding-right:30px;padding-bottom:30px;padding-top:40px;padding-left:30px">
                                        <strong>Verificación de e-mail</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align:left;font-size:15px;line-height:23px;padding-right:30px;padding-bottom:30px;padding-left:30px">
                                        ${user.username} recibes este e-mail para verificar la cuenta de correo <font color="#1e82c4" style="text-decoration:none!important"><a href="mailto:${user.email}" target="_blank">${user.email}</a></font> asociada a tu usuario.
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align:left;font-size:15px;line-height:23px;padding-right:30px;padding-bottom:30px;padding-left:30px">
                                        Pulsa el botón para confirmar y empezar a disfrutar de una experiencia más completa en Rolling Learning Lab.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="color:#333333;margin:auto;background-color:#ffffff">
                                            <tbody><tr>
                                                <td align="center" style="padding-bottom:25px;padding-right:5px;padding-left:5px">
                                                    <table style="margin:auto" align="center" border="0" cellpadding="0" cellspacing="0">
                                                        <tbody>
                                                            <tr>
                                                                
                                                                <td style="background-color:#d81d26;font-family:Arial,sans-serif;font-size:18px;border-radius:5px;color:#ffffff;text-decoration:none;text-align:center">
                                                                    <a class="m_-6414562734630536579fs16" style="color:#ffffff;text-decoration:none;width:200px;display:table-cell;height:50px;vertical-align:middle" href="${verificationLink}" target="_blank" ><strong>Confirmar</strong></a>
                                                                </td>
                                                                
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;font-size:13px;line-height:23px;padding-right:30px;padding-bottom:30px;padding-left:30px;color:#a0a6b5">
                                        Si no te  registraste en Rolling Learning Lab, por favor, no confirmes el e-mail.
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>

                    
                    <tr>
                        <td style="padding-bottom:20px">
                            <table style="max-width:600px;margin:auto" align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#f5f5f5" style="color:#353e4a;font-family:Arial,sans-serif;font-size:15px;margin:auto">
                                            <tbody><tr>
                                                <td style="background-color:#f5f5f5;padding-top:30px">
                                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="color:#353e4a;font-family:Arial,sans-serif;font-size:14px;margin:auto;padding-bottom:10px">
                                                        <tbody><tr>
                                                            <td style="text-align:center;color:#a0a6b5;font-size:16px">
                                                                La escuela líder del Norte Argentino
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-top:20px">
                                                                <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#353e4a;font-family:Arial,sans-serif;font-size:15px;width:100%">
                                                                    <tbody><tr>
                                                                        <td style="height:2px;background-color:#ffffff"></td>
                                                                        <td style="height:2px;background-color:#ffffff"></td>
                                                                        <td style="height:2px;background-color:#ffffff"></td>
                                                                    </tr>
                                                                </tbody></table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="color:#a0a6b5;font-size:12px;padding-top:20px;padding-bottom:10px;text-align:center;line-height:18px">Este e-mail se ha enviado desde RollingCode School (Gral. José María Paz 576, T4000 San Miguel de Tucumán, Tucumán)</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="color:#a0a6b5;font-size:12px;padding-top:10px;padding-bottom:10px;text-align:center;line-height:18px">
                                                                <a style="color:#a0a6b5" href="https://web.rollingcodeschool.com/trabaja-con-nosotros/" target="_blank" >TRABAJÁ CON NOSOTROS</a> | <a style="color:#a0a6b5" href="https://web.rollingcodeschool.com/team/" target="_blank" >NOSOTROS</a> | <a style="color:#a0a6b5" href="https://web.rollingcodeschool.com/contacto/" target="_blank" >CONTACTAR</a>
                                                            </td>
                                                        </tr>
                                                    </tbody></table>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    


                </tbody></table>
            </td>
        </tr>
    </tbody></table>
    `;
};

module.exports = { emailForUser };
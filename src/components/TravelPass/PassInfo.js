import React, { useEffect, useState } from 'react';
import {
    Grid
} from '@material-ui/core'
import clsx from 'clsx';
import get from 'lodash.get';
import QRCode from 'qrcode.react';

export default function PassInfo({
    classes,
    data
}) {
    const { refId, url } =  data;
    const formData =  data.json; 
    const [bgImage, setBgImage] = useState(null);
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }

    useEffect(() => {
        const img = new Image();
        img.onload = function () {
            setBgImage(img);
        };
        img.src = "/bgpass.jpg?r=1"
    }, [1])

    const saveQRCode = (evt) => {
        // setInFlight(true) 
        evt.target.style.display = 'none';
        const canvas = document.getElementById('generated_qr_code');
        const exportCanvas = document.createElement("canvas");
        exportCanvas.width = bgImage.width;
        exportCanvas.height = bgImage.height;
        const ctx = exportCanvas.getContext("2d");

        ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height);
        ctx.drawImage(canvas, 112, 620, 340, 340);
        let yPos = 240;
        const xPos = 68
        const fontSize = 26;

        ctx.font = `24px sans-serif`;
        ctx.fillStyle = "#3333333";
        ctx.fontWeight = 'bold';
        // ctx.fillText(requestId, 320, 200);
        ctx.textAlign = "center";
        ctx.fillText(`${get(formData, 'district.name', 'District').toUpperCase()}`, bgImage.width / 2, yPos);

        ctx.fontWeight = 'normal';
        ctx.font = `18px sans-serif`;
        ctx.fillStyle = "#3333333";
        ctx.textAlign = 'start';
        yPos += (fontSize + 50);
        ctx.fillText(`${get(formData, 'name', 'Name')}`, xPos, yPos); yPos += (fontSize + 32);
        ctx.fillText(`${get(formData, 'govtIdType', 'GovtId')} : ${get(formData, 'govtId', '####')}`, xPos, yPos); yPos += (fontSize + 38);
        ctx.fillText(`${get(formData, 'dateFrom', 'Date/From')} to ${get(formData, 'dateTo', 'Date To')}`, xPos, yPos); yPos += (fontSize + 48);
        const maxWidth = (bgImage.width - xPos - 12);
        const routeStr = [];
        formData.routes.forEach((item, idx) => {
            routeStr.push(`${idx + 1}) ${item.locationFrom} to ${item.locationTo}`);
        })
        wrapText(ctx, routeStr.join('. '), xPos, yPos, maxWidth, fontSize - 2);
        const dataURL = exportCanvas.toDataURL('image/jpeg');
        evt.target.href = dataURL;
        evt.target.style.display = 'inline-block';
    }
    return <Grid container spacing={2} justify="center" className={clsx(classes.formRoot)}>
        <Grid item className="w3-center">
            <div className="w3-left-align">
                <ol>
                    <li> ഇതിൽ നൽകിയിരിക്കുന്ന ആവശ്യങ്ങൾക്കും സേവനങ്ങൾക്കും സ്ഥാലങ്ങൾക്കും അല്ലാതെ മറ്റൊരു കാര്യത്തിനും ഈ പാസ് ഉപയോഗിക്കാൻ പാടില്ല
                </li>
                    <li> ജനങ്ങൾക്കിടയിൽ ഇടപെട്ട്‌ പ്രവർത്തിക്കുമ്പോൾ ശരിയായ സാമൂഹിക അകലം പാലിക്കുക. മറ്റുള്ള വ്യക്തികളുമായി കുറഞ്ഞത് ഒന്നര മീറ്ററെങ്കിലും അകലം പാലിക്കേണ്ടതാണ്
                </li>
                    <li> സേവനപ്രവർത്തനങ്ങൾക്ക് പോകുമ്പോൾ മാസ്ക്ക് ഗ്ലൗസ് എന്നിവ നിർബന്ധമായും ധരിക്കേണ്ടതാണ്
                </li>
                    <li> ഓരോ സേവന പ്രവർത്തനങ്ങക്കും ശേഷം കൈകൾ സൊപ്പൊ ഹാൻഡ്വാഷോ സാനിറ്റൈസറോ ഉപയോഗിച്ച് നന്നായി കഴുകാൻ ശ്രദ്ധിക്കുക
                </li>
                    <li> യാതൊരു കാരണവശാലും കൂട്ടംകൂടി പ്രവർത്തിക്കാനോ ആൾക്കൂട്ടം ഉണ്ടാക്കാനോ പാടില്ല
                </li>
                    <li> സർക്കാരിന്റെയും ആരോഗ്യവകുപ്പിന്റെയും നിർദേശങ്ങളും ക്വാറൻടൈൻ നിയമങ്ങളും കർശനമായി പാലിക്കേണ്ടതാണ്
                </li>
                </ol>
            </div>
            {data.status == 'PENDING' && <div className="w3-section w3-left-align">
                <h6>
                    Your route requests are pending approval.
                    You will get a confirmation SMS in your registerd mobile number after approval.
                    You can show the following QR Code to authorites after you getting the confirmation sms.
            </h6>
            </div>}
            <div className="w3-section">
                { bgImage && <a className="w3-button w3-deep-orange w3-padding-16 w3-round"
                    href="#" download={`route_approval_${refId}.jpg`}
                    onClick={saveQRCode}>Save QR Code</a>
                }
            </div>
            <div>
                <QRCode id="generated_qr_code" size={320} style={{ maxWidth: '320px' }} value={url} />
            </div>
        </Grid>
    </Grid>
}
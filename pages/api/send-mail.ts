import { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to, name, text, html, contents } = req.body;
  // console.log(process.env.SENDGRID_API_KEY, 'sendgrid api key');
  const msg: MailDataRequired = {
    to,
    from: 'contact@anime-club.online',
    subject: '【アニメ部！】お問合せありがとうございました。',
    templateId: 'd-46898b6820a84a5db8840dd33e792d67',
    dynamicTemplateData: {
      name,
      contents,
    },
  };

  try {
    await sgMail.send(msg);
    res
      .status(200)
      .send('メール送信に成功しました。\n内容を確認次第、ご返信いたします。');
  } catch (error) {
    res.status(500).send('メール送信に失敗しました。');
  }
};

export default handler;

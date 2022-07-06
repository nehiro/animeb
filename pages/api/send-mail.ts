import { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to, name, text, html, contents } = req.body;
  // console.log(process.env.SENDGRID_API_KEY, 'sendgrid api key');
  //user
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
  //admin
  const msgToAdmin: MailDataRequired = {
    to: 'contact@anime-club.online',
    from: to,
    subject: '【アニメ部！】お問合せがありました。',
    templateId: 'd-88b95f12184146579aa5ffb9852d8c33',
    dynamicTemplateData: {
      name,
      contents,
      to,
    },
  };

  try {
    await sgMail.send(msgToAdmin);
    console.log('admin成功');
    // res
    //   .status(200)
    //   .send('メール送信に成功しました。\n内容を確認次第、ご返信いたします。');
  } catch (error) {
    console.log(error, 'admin失敗');
    // res.status(500).send('メール送信に失敗しました。');
  }
};

export default handler;

import React, { ReactElement } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';

const Terms = () => {
  return (
    <>
      <BackGroundWhite>
        <SubpageTitle>利用規約</SubpageTitle>
        <p>
          ソーシャルアニメサービス「アニメ部！」へお越し頂き誠にありがとうございます。アニメ部！は、友だちやフォロワーとアニメの情報やレビューをコミュニケーションできるサービスです。アニメ部！のご利用に際しては、この利用規約が適用されます。アニメ部！の利用者は、予めこの利用規約に同意した上で、アニメ部！を利用するものとします。
          <br />
          なお、この利用規約の内容は、必要に応じて変更することがございますので、アニメ部！をご利用の際には、最新の利用規約をご参照ください。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">第1条（定義）</h2>
        <dl>
          <dt>「アニメ部！」</dt>
          <dd>
            練苧弘晃（以下「当方」という。）が提供するソーシャルアニメサービス
          </dd>
          <dt>「本サービス」</dt>
          <dd>アニメ部！により提供されるサービス・情報の総称</dd>
          <dt>「コメント等」</dt>
          <dd>
            プロフィールコメント、観たアニメの評価・レビュー、友人（フォロワー）等のレビューに対するコメント・作品に紐づくエピソードに対するコメント、いいね!等、メンバーが本サービスを利用する際に、送信した一切の数字・文字
          </dd>
          <dt>「メンバー」</dt>
          <dd>
            当方が定めるメンバー登録画面に従い、各種登録情報を登録したものをいう
          </dd>
        </dl>

        <h2 className="mb-1 mt-8 text-lg font-medium">第2条（利用規約）</h2>
        <p>
          メンバーは、このアニメ部！利用規約（以下「本利用規約」という。）について、当方の提供する本サービスを利用することにより本利用規約を承諾したものとします。また、本利用規約は、本サービスを利用する際の一切に適用するものとします。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">第3条（会員登録）</h2>
        <p>
          本サービスのご利用にあたり、メンバー登録を希望する方（以下「申込者」といいます。）は、次の手順でメンバー登録を行い、本サービスを利用するものとします。
        </p>
        <ol className="mt-2 list-outside list-decimal pl-8">
          <li className="mb-2">
            申込者は、当方所定のメンバー登録画面で申込者ご自身に関する正確な必要事項を入力した登録申込内容をインターネットを通じて当方に送信していただきます。
          </li>
          <li className="mb-2">
            申込者は、当方所定のメンバー登録画面の必須項目を全て入力しなければ、メンバー登録できないものとします。
          </li>
          <li className="mb-2">
            当方所定のメンバー登録画面で、申込者が、申込者ご自身に関する正確な必要事項を全て入力し、当方へ送信が完了した時点でメンバー登録が完了します。
          </li>
          <li className="mb-2">
            <p className="mb-2">
              当方は、申込者を事前・事後に関わらず審査し、以下の項目に該当すると当方が判断した場合、当該申込者の申込内容を削除し、将来にわたってすべてのサービスの利用をお断りすることがあります。
            </p>
            <ol className="list-outside list-decimal pl-8">
              <li className="mb-2">申込者が実在しない場合</li>
              <li className="mb-2">
                申込者が送受信可能なメールアドレスを持たない場合
              </li>
              <li className="mb-2">
                申込をした時点で本規約違反等により登録資格の停止処分中である、又は過去に規約違反等に基づく当方からの対処を受けたことがある場合
              </li>
              <li className="mb-2">
                申込の際の申告事項に、故意に虚偽の記載をした場合
              </li>
              <li className="mb-2">
                その他、当方が登録資格を与えることを不適当と判断した場合
              </li>
            </ol>
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">第4条（譲渡禁止等）</h2>
        <p>
          メンバーは、本サービスの提供を受ける権利を第三者に譲渡したり、売買、名義変更、質権の設定その他の担保に供する等の行為ができないものとします。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">第5条（プライバシー）</h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            メンバーの登録情報および当方が取得したメンバーに関する情報は、当方の個人情報保護方針（プライバシーポリシー）に従って取り扱われます。
            当方の個人情報保護方針に関しては、別途定めるプライバシーポリシーの記載をご参照ください。
          </li>
          <li className="mb-2">
            当方からのお知らせ（新規サービス等の広告を含みます。）がある場合、アニメ部！が取得したメールアドレス宛に当方からメールを送信する場合がありますので、ご了承ください。
          </li>
          <li className="mb-2">
            本サービス内で自発的に個人情報を表示した場合、その情報は他のメンバーによって収集され使用される可能性があります。このような情報の送信・開示は、メンバーご自身の責任において行ってください。
          </li>
          <li className="mb-2">
            当方のパートナーや、本サービスを通じてメンバーがアクセスできる第三者のサイトなどは当方とは独立して業務を行っているため、
            個々のプライバシーに関する規程やデータ収集に関する規程に従い個人情報等の情報を収集している場合がありますが、当方は、これらの者が行う業務や定める規程に対していかなる義務や責任も負いません。パスワードや登録情報の保持・管理は、メンバーご自身の責任で行ってください。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">第6条（利用環境）</h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            メンバーは、本サービスを利用するためにインターネットに接続しなければなりません。メンバーは、自らの責任と費用で、必要な機器、ソフトウェア等を適切に準備・操作するものとします。
          </li>
          <li className="mb-2">
            メンバーは、関係官庁が提供する情報その他必要となる情報を参考にして、自己の利用環境に応じ、自らの責任と費用で、コンピュータ・ウィルスの感染、不正アクセスおよび情報漏洩の防止等のセキュリティを保持するものとします。
          </li>
          <li className="mb-2">
            当方は、メンバーがインターネットに接続するための準備・方法等については一切関与致しません。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第7条（自己責任の原則）
        </h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            メンバーは、本サービスの利用と本サービスを利用してなされた一切の行為とその結果について、一切の責任を負います。
          </li>
          <li className="mb-2">
            本サービスの利用と本サービスを利用してなされた一切の行為に起因して、当方または第三者に対して損害を与えた場合、メンバーは、自己の費用と責任をもって損害を賠償するものとします。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第8条（本サービスの中断）
        </h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            <p className="mb-2">
              当方は、以下のいずれかの事由が生じた場合、メンバーに事前に通知をせずに、本サービスの全部または一部の提供を中断することがあります。
            </p>
            <ol className="list-outside list-decimal pl-8">
              <li className="mb-2">
                本サービス用設備等の定期的な点検を行う場合または点検を緊急に行う必要がある場合
              </li>
              <li className="mb-2">
                津波、噴火、洪水、地震等の天災により本サービスの提供が困難となった場合
              </li>
              <li className="mb-2">
                火災、停電等により本サービスを提供することが困難となった場合
              </li>
              <li className="mb-2">
                戦争、動乱、暴動、労働争議等により本サービスを提供することが困難となった場合
              </li>
              <li className="mb-2">
                その他、当方が本サービスの中断が必要と判断した場合
              </li>
            </ol>
          </li>
          <li className="mb-2">
            前項各号またはその他の事由により、本サービスの全部または一部の提供が中断したことにより、メンバーまたは第三者が損害を受けた場合でも、当方は、一切の責任を負わないものとします。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第9条（本サービスの変更・終了）
        </h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            当方が必要と判断した場合には、事前に通知することなくいつでも本サービスの内容を変更、停止、中止または終了することができるものとします。ただし、本サービスの終了等の重大な事由については、本サービス上で告知するように努力しますが、これを保証するものではありません。
          </li>
          <li className="mb-2">
            本サービスの内容を変更、中止、停止または終了した場合により、メンバーまたは第三者が損害を受けた場合でも、当方は、一切の責任を負わないものとします。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第10条（登録申込事項の変更）
        </h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            メンバーは当方への登録申込時に入力した必要事項について変更が生じた場合、速やかに当方に対し当方指定の方法により変更内容を通知するものとします。
          </li>
          <li className="mb-2">
            メンバーからの変更通知がないために、当方からの通知、その他が遅延し、または不着・不履行であった場合、当方はその責任を負わないものとします。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第11条（メンバーの退会）
        </h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            メンバーは当方所定の方法にて当方に届け出ることによって何時でも退会できるものとします。
          </li>
          <li className="mb-2">
            本サービスの登録資格は一身専属性のものとします。当方はメンバーの死亡を知り得た時点を以って前項届出があったものとして取り扱わせていただきます。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第12条（データ等の削除）
        </h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            本サービスの運営および保守管理上の必要から、メンバー等に事前に通知することなく、メンバーが本サービス用設備に登録したデータ等を削除することがあります。
          </li>
          <li className="mb-2">
            メンバーが本サービス用設備に蓄積したデータ等が、当方が適当とする期間または量を超えた場合、当方はメンバー等に事前に通知することなく削除することがあります。
          </li>
          <li className="mb-2">
            当方は、第1項および第2項に基づくデータ等の削除に関し、一切責任を負いません。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第13条（連絡または通知について）
        </h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            メンバーへの連絡または通知の必要があると当方が判断した場合には、本サービス上に表示する方法、電子メールを送信する方法その他適当な方法にて連絡または通知を行います。
          </li>
          <li className="mb-2">
            メンバーが当方に対し連絡する場合、フィードバックを利用して連絡を行うものとします。メンバーは、当方に対し、電話・来訪による連絡はしないものとします。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第14条（コメント等について）
        </h2>
        <p>
          本サービスの利用にあたり、メンバーには以下の各号につき予めご了承いただくものとします。
        </p>
        <ol className="mt-2 list-outside list-decimal pl-8">
          <li className="mb-2">
            コメント等をした本人は除き、当該コメント等を無断転載・無断利用することは禁止します。
          </li>
          <li className="mb-2">
            メンバーがコメント等を行った場合には、メンバーは、当方に対し、当該コメント等の国内外における複製、公衆送信、頒布、翻訳・翻案等、
            著作権法上の権利（著作権法第27条及び第28条に規定される権利を含む）を無償で譲渡するものとします。
          </li>
          <li className="mb-2">
            メンバーがコメント等を行った場合、当該コメント等に関する著作者人格権を行使しないものとします。
          </li>
          <li className="mb-2">
            当方は、コメント等を行ったメンバー自身が、コメント等を利用することについて許諾します。メンバーは、メンバーが行ったコメント等の権利帰属に関して、当方に対し、いかなる権利の主張および行使も行わないものとします。
          </li>
          <li className="mb-2">
            当方または当方から許諾を受けた第三者が、メンバーのコメント等を本件サービス内や第三者のサービスなどにおいて利用する場合があります。この時、メンバーのコメント等の一部を要約・抜粋等する場合があります。また、メンバーのコメント等を利用する場合には、メンバーがコメント等をした際の名前等を表示させていただく場合があります。
          </li>
          <li className="mb-2">
            メンバーが、第三者の著作物等を利用してコメント等を行う場合、メンバーの負担と責任において、必要な権利処理の一切がなされていることを保証するものとします。
          </li>
          <li className="mb-2">
            メンバーは、コメント等を行った場合、そのコメント等に関する複製、公衆送信、頒布、翻訳・翻案等、著作権法上の権利を全て有していることを保証するものとします。
          </li>
          <li className="mb-2">
            本利用規約は、当方が、メンバーに対し、コメント等の利用許諾をすることを約束するものではありません。
            従って、コメント等について、当該コメント等を行った本人を除き、その全部あるいは一部を問わず、商業目的で利用することは、その使用形態を問わず一切禁止します。
          </li>
          <li className="mb-2">
            メンバーのコメント等について、当方が不適切なコメント等であると判断した場合には、当方は、当該メンバーに何ら通知することなく、当方の裁量・判断に基づき、コメント等を削除することができるものとします。
          </li>
          <li className="mb-2">
            当方または第三者が、メンバーのコメント等を利用したことによってメンバーまたは第三者が受けた損害について、当方は一切補償をしないものとします。
          </li>
        </ol>
        <p>
          また、コメント等を行った本人による当該コメント等の利用等、本利用規約が特に認めた場合を除き、メンバーが本サービスに掲載されているコメント等を利用して利益を得た場合には、当方はその利益相当額の金員を請求できるものとします。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">第15条（利用制限）</h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            <p className="mb-2">
              当方は、メンバーが以下のいずれかに該当する場合は、当該メンバーの承諾を得ることなく、当該メンバーの本サービスの利用を制限することがあります。
            </p>
            <ol className="list-outside list-decimal pl-8">
              <li className="mb-2">
                メンバー宛てに発送した郵便物が届かない場合
              </li>
              <li className="mb-2">
                電話、電子メール等による連絡がとれない場合
              </li>
              <li className="mb-2">
                大量送信メールの経路、コンピュータ・ウィルスの感染等、当該メンバーが関与することにより第三者に被害が及ぶおそれがあると判断した場合
              </li>
              <li className="mb-2">
                上記各号の他、当方が必要があると判断した場合
              </li>
            </ol>
          </li>
          <li className="mb-2">
            当方が前項の措置をとったことにより、メンバーが本サービスを使用できず、これによって損害が発生したとしても、当方は一切責任を負いません。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">第16条（禁止事項）</h2>
        <p>メンバーは本サービスを利用して以下の行為を行わないものとします。</p>
        <ol className="mt-2 list-outside list-decimal pl-8">
          <li className="mb-2">
            他のメンバーまたは第三者の財産権、プライバシー、肖像権等を侵害する行為、および侵害するおそれのある行為
          </li>
          <li className="mb-2">
            当方、他のメンバーまたは第三者の著作権、商標権等の知的財産権を侵害する行為、および侵害するおそれのある行為
          </li>
          <li className="mb-2">
            特定個人の氏名・住所・電話番号・メールアドレスなど第三者が見て個人を特定できる情報の提供
          </li>
          <li className="mb-2">
            重複して複数のメンバー登録をし、スコアの不正操作等の本サービス運営や他のメンバーに不利益をもたらす行為
          </li>
          <li className="mb-2">
            他のメンバーまたは第三者を差別・誹謗中傷する行為、または他のメンバーまたは第三者の名誉・信用を毀損する行為
          </li>
          <li className="mb-2">
            アクセス可能な本サービスまたは第三者の情報を改ざん、消去する行為
          </li>
          <li className="mb-2">
            当方、他のメンバーまたは第三者になりすます行為
          </li>
          <li className="mb-2">
            有害なコンピュータプログラム等を送信し、または他のメンバー・第三者が受信可能な状態におく行為
          </li>
          <li className="mb-2">
            他のメンバーのコメント等の受信を妨害する行為のほか、他のメンバーまたは第三者に対し、無断で、広告・宣伝・勧誘等のコメント等もしくは嫌悪感を抱くコメント等（そのおそれのあるコメント等を含みます。）を送信する行為。連鎖的なコメント等の転送を依頼する行為および当該依頼に応じて転送する行為
          </li>
          <li className="mb-2">
            他のメンバーまたは第三者の設備、本サービス用設備（当方が本サービスを提供するために用意する通信設備、電子計算機、その他の機器およびソフトウェアをいいます。）に無権限でアクセスし、またはポートスキャン、DOS攻撃もしくは大量のメール送信等により、その利用もしくは運営に支障を与える行為（与えるおそれのある行為を含みます。）
          </li>
          <li className="mb-2">
            サーバ等のアクセス制御機能を解除または回避するための情報、機器、ソフトウェア等を流通させる行為
          </li>
          <li className="mb-2">
            本人の同意を得ることなく、または詐欺的な手段（いわゆるフィッシングおよびこれに類する手段を含みます。）により第三者のメンバー登録情報を取得する行為
          </li>
          <li className="mb-2">
            当方が事前に書面をもって承認した場合を除き、本サービスを使用して営業活動、営利を目的とした利用およびその準備を目的とした利用をする行為
          </li>
          <li className="mb-2">
            法令に基づき監督官庁等への届出、許認可の取得等の手続きが義務づけられている場合に、当該手続きを履行せずに本サービスを利用する行為。その他当該法令に違反する、または違反するおそれのある行為
          </li>
          <li className="mb-2">
            本サービスの運営を妨害する行為。他のメンバーまたは第三者が主導する情報の交換または共有を妨害する行為。信用の毀損または財産権の侵害等のように当方、メンバーまたは第三者に不利益を与える行為
          </li>
          <li className="mb-2">
            長時間の架電、同様の問い合わせの繰り返しを過度に行い、または義務や理由のないことを強要し、当方の業務に著しく支障を来たす行為
          </li>
          <li className="mb-2">
            上記各号の他、法令、または本利用規約に違反する行為。公序良俗に違反する行為。犯罪的行為に結びつく行為
          </li>
          <li className="mb-2">
            上記各号のいずれかに該当する行為（当該行為を第三者が行っている場合を含みます。）が見られるデータ等へ当該行為を助長する目的でリンクを張る行為
          </li>
          <li className="mb-2">
            その他当方がメンバーとして不適当と判断する行為
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          第17条（本利用規約違反への対処）
        </h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            当方が、メンバーの行為について本利用規約に反すると判断した場合、メンバーの帰責性の有無に関わらず当方の裁量・判断に基づき、当該メンバーに何ら通知することなく、コメント等の削除、本サービスの一時停止、本サービスに対するアクセスの拒否その他当方が適切と判断する措置（以下「措置」という。）を講じることができるものとします。その際、本利用規約に反すると判断した理由については、メンバーに対して一切お答えできません。
          </li>
          <li className="mb-2">
            措置に起因してメンバーに生じた損害については、当方は一切の責任を負わないものとします。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">第18条（免責）</h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            メンバーは、自己の責任のもとに本サービスを利用することとし、当方は、本サービスの利用により発生したメンバーの損害については、直接的、間接的、特別、二次的または付随的かを問わず、一切の賠償責任を負いません（事前に当方が損害の可能性について通告を受けていたかを問いません。）。
          </li>
          <li className="mb-2">
            本サービスを利用することにより、メンバーが第三者に対し損害を与えた場合、メンバーは自己の費用と責任においてこれを賠償するものとします。
          </li>
          <li className="mb-2">
            何らかの外的要因（システムの故障等）により、本サービスのデータが破損した場合であっても、当方はその責任を負いません。
          </li>
          <li className="mb-2">
            当方は、本サービスに発生した不具合、エラー、障害等、本サービスが利用できないことに起因する損害について一切の賠償責任を負いません。
          </li>
          <li className="mb-2">
            当方は、提供する情報およびソフトウェア等について、その完全性、正確性、合目的性、適用性または有用性等に関する、いかなる保証もしないものとします。
          </li>
          <li className="mb-2">
            当方は、アニメやコメント等の正確性を含む一切の内容について、保証を致しません。アニメやコメント等の内容によって生じたメンバーの損害や、メンバー同士のトラブル等に対し、当方は一切の補償および関与をしないものとします。
          </li>
          <li className="mb-2">
            当方は、本サービスからリンクされた第三者が運営する外部サイトに関して、いかなる保証も致しません。リンク先で生じた損害や、メンバー同士のトラブル等に対し、当方は一切の補償および関与をしないものとします。
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">第19条（財産権）</h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            本サービスに含まれているコンテンツ、個々の情報、商標、画像、広告、デザイン等に関する著作権、商標権その他の知的財産権、およびその他の財産権は全て当方または正当な権利者に帰属しています。
          </li>
          <li className="mb-2">
            メンバーは､当方または著作権その他の知的財産権およびその他の財産権を有する第三者から利用･使用の許諾がある場合のほか、法令により権利者からの許諾なく利用・使用することを許容されている場合を除き、本サービスおよび本サービスの内容について複製、編集、改変、掲載、転載、公衆送信、配布、販売、提供、翻訳・翻案その他あらゆる形態による利用・使用を行ってはいけません。
          </li>
          <li className="mb-2">
            本サービスおよび本サービスに関連して使用されている全てのソフトウェアは、知的財産権に関する法令等により保護されている権利を含んでいます。
          </li>
          <li className="mb-2">
            メンバーが前各項に反する行為によって被った損害については、当方は一切の責任を負わないものとします。また、メンバーがこれらの行為によって利益を得た場合、当方はその利益相当額を請求できる権利を有するものとします。
          </li>
        </ol>
        <h2 className="mb-1 mt-8 text-lg font-medium">第19条（財産権）</h2>
        <ol className="list-outside list-decimal pl-8">
          <li className="mb-2">
            当方はメンバーの了承を得ることなく、本利用規約を随時変更・改定することができることとします。
          </li>
          <li className="mb-2">
            本利用規約の変更については、本サービス上に表示した時点で、メンバーが了承したものとみなします。
          </li>
        </ol>
        <h2 className="mb-1 mt-8 text-lg font-medium">第21条（分離）</h2>
        <p>
          本利用規約の条項のいずれかが管轄権を有する裁判所により違法または無効であると判断された場合であっても、当該条項以外の本利用規約の効力は影響を受けないものとします。
        </p>
        <h2 className="mb-1 mt-8 text-lg font-medium">第22条（裁判管轄）</h2>
        <p>
          メンバーと当方との間で訴訟が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
        </p>
        <h2 className="mb-1 mt-8 text-lg font-medium">第23条（準拠法）</h2>
        <p>本利用規約は、日本国法に準拠し、解釈されるものとします。</p>

        <p className="mt-8 text-right">以上</p>
      </BackGroundWhite>
    </>
  );
};

export default Terms;
Terms.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;

import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';

const Privacy = () => {
  return (
    <>
      <NextSeo
        title="プライバシーポリシー | アニメ部！"
        description="アニメ部！を安心して利用していただくためプライバシーポリシーを定め、個人情報を厳重に管理致します。"
        openGraph={{
          url: 'https://anime-club.online/privacy',
          title: 'プライバシーポリシー | アニメ部！',
          description:
            'アニメ部！を安心して利用していただくためプライバシーポリシーを定め、個人情報を厳重に管理致します。',
        }}
      />
      <Breadcrumbs
        pages={[
          {
            name: 'プライバシーポリシー',
          },
        ]}
      />
      <BackGroundWhite>
        <SubpageTitle>プライバシーポリシー</SubpageTitle>
        <p>
          練苧弘晃(以下「当方」といいます。)が提供する、ソーシャルアニメサービス「アニメ部！」(以下アニメ部！により提供されるサービス・情報の総称を「本サービス」といいます。)を安心して利用していただくため、当方は以下のようにプライバシーポリシーを定め、個人情報を厳重に管理します。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          1 プライバシーポリシーの適用範囲
        </h2>
        <p>
          本プライバシーポリシーは、「
          <Link href="/terms">
            <a className="text-purple">アニメ部！利用規約</a>
          </Link>
          」に含まれるものとして位置づけられており、利用者が本サービスを利用するときに適用されます。
          当方が本サービスを通じて利用者の皆様から取得した情報は、本プライバシーポリシーに従って取り扱われます。ただし、リンク先など他事業者等による個人情報収集及び利用等は、本プライバシーポリシーの適用範囲ではありません。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">2 利用者情報の取得</h2>
        <p>
          当方は、利用者の皆様が本サービスを利用する際に、以下の情報(「パーソナル情報」、「公開情報」及び「広告情報」を含み、あわせて「利用者情報」と総称します。)を提供いただいたり、自動的に取得したりすることがあります。
        </p>

        <h3 className="mt-2">【パーソナル情報】</h3>
        <p>
          アニメ部！ID、メールアドレス、性別、生年月日、Facebook、Google、LINE及びTwitterのID。
        </p>
        <h3 className="mt-2">【公開情報】</h3>
        <p>
          Watched、Checked、いいね!、タグ、レビュー、コメント、ニックネーム及びプロフィール画像等の本サービスで他の利用者が閲覧可能な一切の情報、作成・更新日時等のメタデータ、言語、タイムゾーン
        </p>
        <h3 className="mt-2">【広告情報】</h3>
        <p>
          匿名のユーザー ID （ IDFA、 Android AdID、
          Cookie情報、提携パートナーより受け取ったID等）とそれにひもづく、視聴環境（OS情報、
          広告表示アプリ情報、端末情報、位置情報、IPアドレス等）、広告の閲覧情報、広告に対するアンケート結果
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">3 安全管理措置</h2>
        <p>
          当方は、個人情報の漏えい、滅失又は毀損の防止その他個人情報の保護のため、すべての従業員に対する教育の実施や研修等を行い、さらにシステム面でも個人情報ファイルへのアクセス制限の実施、アクセスログの記録及び外部からの不正アクセス防止のためのセキュリティ対策の実施等、個人情報の安全管理のための必要かつ適切な措置を講じます。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          4 利用者情報の利用目的
        </h2>
        <p>
          当方は、利用者情報を以下の利用目的の範囲内に限って利用することとし、利用目的の範囲を超えて利用するときは、予め利用者本人の同意を得ることとします。なお、当方が当方以外から個人情報の提供を受ける際に、当該情報の利用目的について別途明示をした場合は、その内容に従い利用します。
        </p>
        <ol className="mt-2 list-outside list-decimal pl-8">
          <li className="mb-2">
            本サービスについての調査・データ集積、研究開発、本サービスの改善及びサポートのため
          </li>
          <li className="mb-2">
            新しいサービスの検討、本サービスの運営方針決定のため
          </li>
          <li className="mb-2">
            本サービスに関するお知らせやアンケートをしたり、必要に応じて連絡をしたりするため
          </li>
          <li className="mb-2">
            当方がおすすめする商品・サービスなどのご案内を送信・送付するため
          </li>
          <li className="mb-2">本人確認をするため</li>
          <li className="mb-2">
            不正・不当な目的で本サービスを利用しようとされる方のご利用をお断りするため
          </li>
          <li className="mb-2">利用者の皆様からのお問合せに対応するため</li>
          <li className="mb-2">
            個人が特定されない形式での統計データその他情報を作成し、当方での利用又は外部に公開するため
          </li>
          <li className="mb-2">
            当方サービスに関する情報等または当方以外の事業者が広告主となる広告情報等を告知するため
          </li>
          <li className="mb-2">広告等の効果の測定、報告、検証及び改善のため</li>
          <li className="mb-2">
            利用者個人にカスタマイズされた当方サービス提供のため
          </li>
          <li className="mb-2">
            ご注文、ご応募いただいた商品・賞品の発送のため
          </li>
          <li className="mb-2">その他上記各号に附随する目的のため</li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          5 利用者情報の開示について
        </h2>
        <ol className="mt-2 list-outside list-decimal pl-8">
          <li className="mb-2">
            当方は、利用者情報を販売したり貸し出したりすることはいたしません。ただし、以下の場合に、利用者情報を第三者に提供する場合があります。
            <ol className="mt-2 list-outside list-decimal pl-4">
              <li className="mb-2">利用者本人の同意がある場合</li>
              <li className="mb-2">
                裁判所・警察等の公的機関またはそれらの委託を受けた者より開示請求や照会があった場合
              </li>
              <li className="mb-2">
                本サービスの利用に関連して、利用者が法令や本利用規約等に反し、第三者または当方の権利、財産、サービス等を保護するために必要と認められる場合
              </li>
              <li className="mb-2">
                人の生命、身体および財産等に対する差し迫った危険があり、緊急の必要性がある場合であって、利用者本人の同意を得ることが困難な場合
              </li>
              <li className="mb-2">
                その他法令上適法に提供が認められている場合
              </li>
            </ol>
          </li>
          <li className="mb-2">
            前号の定めにかかわらず、当方は公開情報については、主に利用者自身が本サービスにおいて公開している情報であることを踏まえ、利用者の公開情報を、他の利用者及びサービスに幅広く拡散することとし、本サービスのコンテンツを各自のサービスに組み込む検索エンジン、開発者、パブリッシャー、調査・マーケティングを目的とした広告会社、調査会社、研究機関などの組織に提供されることがあります。なお、広告・PRの制作物に本サービスのコンテンツが組み込まれ、店舗、テレビ、雑誌、新聞、インターネット等に公開情報が掲載される場合があります。
          </li>
          <li className="mb-2">
            第１号の定めにかかわらず、当方は広告情報については以下の各号に定める第三者に提供することがあります。なお、当方が提供する広告情報は、原則として匿名化され個人を特定することが困難な情報となりますが、当方が広告情報を個人関連情報として第三者に提供する場合において、当該第三者が、お客様本人が識別される個人データとして広告情報を利用することが想定されるときは、お客様から同意を得ていることを確認した上で、当該第三者への提供を行います。
            <ol className="mt-2 list-outside list-decimal pl-4">
              <li className="mb-2">広告会社、宣伝会社</li>
              <li className="mb-2">調査会社</li>
              <li className="mb-2">FacebookやTwitterなどのSNS運営会社</li>
              <li className="mb-2">Google、DMP、DSPなどの広告運営会社</li>
            </ol>
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          6 匿名加工情報の取り扱いについて
        </h2>
        <p>
          当方は、特定の個人を識別することができないように個人情報を加工し、当該個人情報を復元できないよう適切な保護措置を講じたうえで、匿名加工情報の作成と当該情報の第三者への提供を継続的に実施します。
        </p>
        <ol className="mt-2 list-outside list-decimal pl-8">
          <li className="mb-2">
            匿名加工情報の元となる項目
            <ol className="mt-2 list-outside list-decimal pl-4">
              <li className="mb-2">利用者の個人属性情報（性別、生年月日等）</li>
              <li className="mb-2">
                利用者のサービス利用履歴（Watched、Checked、Fan!、いいね!、タグ、レビュー、コメントなどを含みます）
              </li>
              <li className="mb-2">
                利用者のユーザーID
                <p>
                  尚、匿名加工情報には、上記のうち、当方社内及び提供先での利用目的に応じ、必要最低限の項目のみが含まれます。
                </p>
              </li>
            </ol>
          </li>
          <li className="mb-2">
            匿名加工情報の作成方法
            <p>
              当方は、個人情報保護法が定める加工基準に沿って、利用者の情報を加工し匿名加工情報を作成します。
            </p>
            <p className="mt-4">主な加工方法と加工例</p>
            <ol className="mt-2 list-outside list-decimal pl-4">
              <li className="mb-2">特定の個人を識別する項目の削除</li>
              <li className="mb-2">
                特定の個人を識別する項目の仮名化
                <p>
                  例）ユーザーID等のIDは再識別ができないランダムな文字列等に変換
                </p>
              </li>
              <li className="mb-2">
                特定の個人の識別又は元の個人情報の復元につながるおそれがある項目の一般化等
                <p>例）生年月日を年齢層や生年月に変換</p>
              </li>
              <li className="mb-2">
                特異な記述の削除
                <p>例）年齢が「116歳」という情報を「60歳以上」に置き換え</p>
              </li>
            </ol>
          </li>
          <li className="mb-2">
            第三者提供の方法
            <p>
              当方が作成した匿名加工情報を第三者に提供する場合、電子データを暗号化し、セキュリティが確保された手段で提供します。
            </p>
          </li>
          <li className="mb-2">
            匿名加工情報の安全管理措置
            <p>
              当方は、匿名加工情報を取り扱う従業員に対し、安全管理措置が遂行されるよう監督を行います。
            </p>
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">7 広告配信について</h2>
        <p>
          当方は、利用者の皆様のニーズに最適な広告を配信するよう取り組み、利用者一人ひとりの利便性の向上に努めています。より適切な広告を配信するため、広告情報はアニメ部！IDと連携され管理されます。
          <br />
          一方で、利用者の皆様のプライバシーへの配慮により、安心して本サービスをご利用いただける環境を提供することも重要であると考え、以下に定める行為は広告配信において実施しません。
          <br />
          なお、利用者の情報に基づき最適化された広告配信は、いつでも利用者自身の希望に合わせて停止又は再開を選択することが可能です。
        </p>
        <ol className="mt-2 list-outside list-decimal pl-8">
          <li className="mb-2">
            ソーシャルの友達関係など、特定の目的で収集した個人情報を、予め特定された目的以外で利用する行為
          </li>
          <li className="mb-2">
            利用者の興味関心や属性の推定において、個人を特定する行為
          </li>
          <li className="mb-2">
            健康状態や政治的信条、宗教など、利用者の機微な属性を推定・分類する行為
          </li>
        </ol>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          8 利用者情報の閲覧・修正等について
        </h2>
        <p>
          当方は、利用者ご本人より利用者情報の開示、訂正、利用停止、削除のご要請があった場合、本人確認を行ったうえで、適宜対応を行いますので、下記14のお問い合わせ窓口へご連絡ください。また、開示請求については、回答にあたり、弊社所定の手数料（1,000円）をいただくとともに、回答までに一定の期間を要する場合がありますので、あらかじめご了解ください。
          <br />
          ただし、不合理に繰り返される要請、過度の技術的努力を要する要請、他者のプライバシーを害するおそれのある要請等、当方が著しく不当な要請であると判断する要請についてはお断りすることがあります。
          <br />
          なお、当方からの利用者情報の開示については、電子メール・書面・電話その他の方法により行うものとします。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">9 苦情処理</h2>
        <p>当方は、利用者情報の管理に関する苦情に対して誠実に対応します。</p>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          10 利用者情報の利用期間・保持期間
        </h2>
        <p>
          利用者が本サービスを利用しなくなった場合であっても、利用者から削除依頼が行われない限り、当方は利用者情報を不特定期間保持することがあります。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">11 情報の預託</h2>
        <p>
          当方は、本プライバシーポリシー第４項に記載の利用目的の達成に必要な範囲内において、利用者の皆様から取得した利用者情報の全部または一部を業務委託先に預託することがあります。
          <br />
          その際、業務委託先としての適格性を十分審査するとともに、委託した利用者情報の安全管理が図られるよう、当該業務委託先に対する必要かつ適切な監督を行います。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          12 プライバシーポリシーの範囲
        </h2>
        <p>
          本プライバシーポリシーは、当方と利用者間にのみ適用されるものです。そのため、業務提携先企業・業務委託先企業・リンク先のサイト等には適用されず、それらのサイト等において、トラブルが発生した場合は、当方は一切責任を負いません。各サイト等の個人情報の取扱いについて十分ご確認下さい。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">
          13 プライバシーポリシーの改定
        </h2>
        <p>
          当方は、利用者情報の取り扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて本プライバシーポリシーを改定することがあります。
          <br />
          本プライバシーポリシーの変更については、利用者の方に個別に通知し又は本サービス内で皆様に告知する方法で通知します。
        </p>

        <h2 className="mb-1 mt-8 text-lg font-medium">14 お問合せ窓口</h2>
        <p>
          当方の利用者情報の取扱いに関するご質問や苦情等のお問い合わせについては、下記の窓口までご連絡ください。
        </p>
        <p>[お問合せ先]</p>
        <p>アニメ部！</p>
        <p>E-mail：contact@anime-club.online</p>

        <p className="mt-8 text-right">以上</p>
      </BackGroundWhite>
      <Breadcrumbs
        pages={[
          {
            name: 'プライバシーポリシー',
          },
        ]}
      />
    </>
  );
};

export default Privacy;
Privacy.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;

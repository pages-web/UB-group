"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Award,
  FileCheck,
  Leaf,
  Handshake,
  Eye,
  Target,
  Star,
  Building2,
  TrendingUp,
  Sparkles,
  Truck,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

/* ─── Reveal wrapper ─── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      if (progress >= 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const timeline = [
  { year: "2006", title: "Дорнын Их Гэгээ ХХК", desc: "Улаанбаатар групп нь Дорнын Их Гэгээ ХХК нэртэйгээр анх үүсгэн байгуулагдав." },
  { year: "2009", title: "Газрын тосны тээвэр", desc: "Монгол Улсын хамгийн анхны газрын тосны технологийн тээвэр эрхэлсэн 100% үндэсний хөрөнгө оруулалттай компани болов." },
  { year: "2010", title: "Газрын тос боловсруулах", desc: "Монголд анх удаа газрын тос боловсруулах үйлдвэрийг нөхөн сэргээв. Түүхий газрын тосны тээвэрлэлтийн үйл ажиллагааг эхлүүлэв." },
  { year: "2011", title: "Евро стандартын үйлдвэр", desc: "Евро стандартын вакум цонх, шилэн фасад үйлдвэрлэгч Гэрэлт Констракшн ХХК үүсгэн байгуулагдаж үйл ажиллагааны чиглэлээ өргөтгөв. Санхүүгийн салбарт Эм Эн Эф Эс ХХК тансаг зэрэглэлийн автомашин барьцаалан зээлдүүлэх үйлчилгээг эхлүүлэв." },
  { year: "2013", title: "Гэгээн тауэр", desc: "Өвөрхангай аймгийн Арвайхээр суманд Гэгээн тауэр үйлчилгээтэй орон сууцны барилгыг барьж ашиглалтанд оруулав." },
  { year: "2014", title: "UB Vista", desc: "Улаанбаатар хот, Сонгинохайрхан дүүрэгт UB Vista үйлчилгээтэй орон сууцны барилгыг барьж эхэлсэн. Гео Петро Инженеринг ХХК болон Монголиан Петролиум Инженеринг ХХК-ийн үйл ажиллагаа өргөжив. Юу Би Рийл Эстэйт ХХК байгуулагдав." },
  { year: "2017", title: "Банк бус санхүүгийн байгууллага", desc: "Монгол банкнаас Банк бус санхүүгийн байгууллага-н тусгай зөвшөөрлийг авч Юу Би Актив ХХК-ийн үйл ажиллагааг эхлүүлэв. Монгол Улсад анх удаа газрын тос үйлдвэрлэлийн өрмийн цооногийг нэвтрүүлэв." },
  { year: "2018", title: "Хотын төвийн төслүүд", desc: "Хотын төвийн А зэрэглэлийн бүсүүдэд оффисийн болон орон сууцны барилгын томоохон төслүүдийг эхлүүлэв. Түүхий газрын тосны олон улсын тээвэрлэлтийг эхлүүлэв. Yoshinoya олон улсын эрүүл түргэн хоолны сүлжээ рестораны франчайзийн гэрээнд гарын үсэг зурав." },
  { year: "2019", title: "UB Concrete", desc: "Бетон зуурмагны UB Concrete компанийг үүсгэн байгуулж, цагт 120 м.куб бетон үйлдвэрлэх хүчин чадал бүхий үйлдвэрийг барьж ашиглалтанд оруулсан." },
  { year: "2021", title: "Avenue Residence", desc: "Чингэлтэй дүүргийн 2-р хороонд Avenue Residence 55 айлын үйлчилгээтэй бизнес зэрэглэлийн орон сууцыг амжилттай барьж ашиглалтанд оруулан Улсын комисст хүлээлгэн өгөв. Vision Business Tower-ийн ажлыг эхлүүлсэн." },
  { year: "2022", title: "ProTeam фитнесс", desc: "Орчин үеийн тоног төхөөрөмжөөр иж бүрэн тоноглогдсон ProTeam фитнессийг Тусгаар тогтнолын ордны 4 давхарт амжилттай нээсэн." },
  { year: "2023", title: "BENEBENE дэлгүүр", desc: "БНСУ-ын алдарт BENEBENE хүүхдийн хувцасны дэлгүүрийн Монгол дахь албан ёсны төлөөлөгчийн эрхийг авч Улсын Их Дэлгүүрийн 5 давхарт анхны салбараа нээсэн." },
  { year: "2024", title: "Шилдэг төсөл хэрэгжүүлэгч", desc: "Barilga EXPO 2024 олон улсын үзэсгэлэн яармагт Vision Business Tower, Central Park, Vision Complex төслүүдээр оролцож Шилдэг төсөл хэрэгжүүлэгч компаниар шалгарсан. Хотын А бүсэд 21,000 м.кв талбай бүхий барилгыг ашиглалтанд орууллаа." },
  { year: "2025", title: "Бидний түүх", desc: "Бидний түүхэд эдгээр мэдээллийг нэмж өгөв." },
];

const chairmanMessage = {
  mn: {
    label: "ТУЗ-ийн даргын мэндчилгээ",
    title: "Хүндэт харилцагч, түншүүдээ",
    paragraphs: [
      "Улаанбаатар Групп ХХК нь 2006 оноос хойш Монгол Улсын хөгжлийн тулгуур багана болохуйц олон төсөл, хөтөлбөрүүдийг амжилттай хэрэгжүүлж ирсэн тэргүүлэгч барилга, дэд бүтцийн групп компани юм.",
      "Бидний зорилго нь дэвшилтэт технологи, олон улсын стандартыг эх орныхоо хөгжилтэй холбон, хүмүүсийн амьдралын чанар, хүртээмжтэй өгөөжийг нэмэгдүүлэхэд оршино. Энэхүү аялалд бидний итгэл үнэмшил, хамтын зүтгэл, хариуцлага л үндэс болдог.",
      "Ирээдүйд бид тогтвортой хөгжил, инноваци, нийгмийн хариуцлагыг улам бүр эрхэмлэн, Монгол Улсын хөгжилд илүү их хувь нэмэр оруулахыг эрхэм зорилгоо болгон ажиллана."
    ],
    signature: "Ц.Батбаатар",
    role: "ТУЗ-ийн дарга"
  },
  en: {
    label: "Chairman's Message",
    title: "Dear partners and stakeholders",
    paragraphs: [
      "Ulaanbaatar Group LLC has been a leading construction and infrastructure group since 2006, successfully delivering numerous projects that have become cornerstones of Mongolia's development.",
      "Our goal is to connect advanced technology and international standards with our country's development, improving the quality of life and accessible benefits for our people. Belief, teamwork, and responsibility are the foundations of this journey.",
      "In the future, we will continue to uphold sustainable development, innovation, and social responsibility, striving to contribute even more to Mongolia's progress."
    ],
    signature: "T. Batbaatar",
    role: "Chairman of the Board"
  }
};

const historyTimeline = [
  {
    year: "2026",
    titleMn: "Дэлхийн түвшинд",
    titleEn: "Global Standard",
    bulletsMn: [
      "Олон улсын стандартад нийцсэн Vision Business Tower-ийг ашиглалтанд оруулах бэлтгэлээ хангаж байна.",
      "Тогтвортой хөгжлийн стратегийн хүрээнд ногоон барилга, сэргээгдэх эрчим хүчний төслүүдийг өргөжүүллээ.",
      "Улаанбаатар бизнес төв, үйлчилгээний объектод менежментийн шинэ стандартыг нэвтрүүлж эхлэв."
    ],
    bulletsEn: [
      "Preparing to commission the internationally-standard Vision Business Tower.",
      "Expanded green building and renewable energy projects under the sustainability strategy.",
      "Began introducing new management standards for UB business centers and service facilities."
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2025",
    titleMn: "Шинэ шатанд",
    titleEn: "New Stage",
    bulletsMn: [
      "Монгол Улсын ТОП-100 аж ахуйн нэгжийн эхний эгнээнд багтлаа.",
      "Олон улсын стандартад нийцсэн Vision Business Tower, Central Park UB төслүүдийг хэрэгжүүлж байна.",
      "Тогтвортой хөгжил, нийгмийн хариуцлагын чиглэлээр олон улсын түншлэлээ өргөжүүллээ."
    ],
    bulletsEn: [
      "Ranked among Mongolia's TOP-100 enterprises.",
      "Executing Vision Business Tower and Central Park UB to international standards.",
      "Expanded international partnerships in sustainability and CSR."
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2024",
    titleMn: "Шилдэг төсөл хэрэгжүүлэгч",
    titleEn: "Best Project Implementer",
    bulletsMn: [
      "Barilga EXPO 2024 олон улсын үзэсгэлэн яармагт шилдэг төсөл хэрэгжүүлэгч компаниар шалгарлаа.",
      "Vision Business Tower, Central Park, Vision Complex төслүүдээр үзэсгэлэнд оролцов.",
      "Хотын А бүсэд 21,000 м.кв талбай бүхий барилгыг ашиглалтанд орууллаа."
    ],
    bulletsEn: [
      "Named Best Project Implementing Company at Barilga EXPO 2024.",
      "Showcased Vision Business Tower, Central Park, and Vision Complex.",
      "Put into operation 21,000 sqm of Class-A real estate in the city center."
    ],
    images: [
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2023",
    titleMn: "BENEBENE дэлгүүр",
    titleEn: "BENEBENE Store",
    bulletsMn: [
      "БНСУ-ын алдарт BENEBENE хүүхдийн хувцасны дэлгүүрийн Монгол дахь албан ёсны төлөөлөгчийн эрхийг авлаа.",
      "Улсын Их Дэлгүүрийн 5 давхарт анхны салбараа амжилттай нээлээ.",
      "Лайфстайл, үйлчилгээний салбартаа шинэ брэндийг нэмлээ."
    ],
    bulletsEn: [
      "Obtained official distributorship for Korea's famous BENEBENE children's clothing brand in Mongolia.",
      "Successfully opened the first store on the 5th floor of the State Department Store.",
      "Added a new brand to the lifestyle and services sector."
    ],
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2022",
    titleMn: "ProTeam фитнесс",
    titleEn: "ProTeam Fitness",
    bulletsMn: [
      "Орчин үеийн тоног төхөөрөмжөөр иж бүрэн тоноглогдсон ProTeam фитнессийг Тусгаар тогтнолын ордны 4 давхарт нээлээ.",
      "Лайфстайл, эрүүл мэндийн үйлчилгээний чиглэлээр үйл ажиллагаагаа өргөжүүллээ.",
      "Хотын төвийн бизнес, үйлчилгээний дэд бүтцийг бэхжүүлэв."
    ],
    bulletsEn: [
      "Opened ProTeam Fitness, fully equipped with modern equipment, on the 4th floor of the Independence Palace.",
      "Expanded operations into lifestyle and wellness services.",
      "Strengthened the city's central business and service infrastructure."
    ],
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2021",
    titleMn: "Avenue Residence",
    titleEn: "Avenue Residence",
    bulletsMn: [
      "Чингэлтэй дүүргийн 2-р хороонд Avenue Residence 55 айлын орон сууцыг ашиглалтанд орууллаа.",
      "Vision Business Tower-ийн бүтээн байгуулалтын ажлыг эхлүүлсэн.",
      "UB Concrete-ийн хүчин чадлыг өргөтгөн, томоохон төслүүдэд нийлүүлэлтээ хийж эхэллээ."
    ],
    bulletsEn: [
      "Delivered Avenue Residence, a 55-unit serviced apartment building in Chingeltei district.",
      "Broke ground on Vision Business Tower.",
      "Expanded UB Concrete capacity and began supplying major projects."
    ],
    images: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2019",
    titleMn: "UB Concrete",
    titleEn: "UB Concrete",
    bulletsMn: [
      "Бетон зуурмагны UB Concrete компанийг үүсгэн байгууллаа.",
      "Цагт 120 м.куб бетон үйлдвэрлэх хүчин чадал бүхий үйлдвэрийг ашиглалтанд оруулсан.",
      "Барилгын төслүүдийн дотоод нийлүүлэлтийн сүлжээг бэхжүүллээ."
    ],
    bulletsEn: [
      "Established UB Concrete.",
      "Commissioned a ready-mix plant with 120 cubic meters per hour capacity.",
      "Strengthened in-house supply chain for construction projects."
    ],
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1590644365607-1c5a56ed65d2?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400\u0026h=300\u0026fit=crop"
    ]
  },
  {
    year: "2018",
    titleMn: "Хотын төвийн төслүүд",
    titleEn: "City Center Projects",
    bulletsMn: [
      "Хотын төвийн А зэрэглэлийн бүсүүдэд оффисийн болон орон сууцны барилгын томоохон төслүүдийг эхлүүлэв.",
      "Түүхий газрын тосны олон улсын тээвэрлэлтийг эхлүүлэв.",
      "Yoshinoya олон улсын эрүүл түргэн хоолны сүлжээ рестораны франчайзийн гэрээнд гарын үсэг зурав."
    ],
    bulletsEn: [
      "Started major office and residential projects in central Class-A districts.",
      "Launched international crude oil transportation.",
      "Signed the franchise agreement for Yoshinoya international healthy fast-food chain."
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400\u0026h=300\u0026fit=crop"
    ]
  },
  {
    year: "2017",
    titleMn: "ББСБ зөвшөөрөл",
    titleEn: "NBFI License",
    bulletsMn: [
      "Монгол банкнаас Банк бус санхүүгийн байгууллагын тусгай зөвшөөрлийг авлаа.",
      "Юу Би Актив ХХК-ийн үйл ажиллагааг эхлүүлсэн.",
      "Газрын тос үйлдвэрлэлийн өрмийн цооногийг Монголд анх удаа нэвтрүүлэв."
    ],
    bulletsEn: [
      "Obtained a non-bank financial institution license from the Bank of Mongolia.",
      "Launched UB Active LLC operations.",
      "Introduced the first oil-production drilling well in Mongolia."
    ],
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565514020176-dbf2277e4955?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2014",
    titleMn: "UB Vista",
    titleEn: "UB Vista",
    bulletsMn: [
      "Улаанбаатар хот, Сонгинохайрхан дүүрэгт UB Vista үйлчилгээтэй орон сууцыг барьж эхэлсэн.",
      "Гео Петро Инженеринг, Монголиан Петролиум Инженеринг компаниуд үйл ажиллагаагаа өргөжүүлэв.",
      "Юу Би Рийл Эстэйт ХХК байгуулагдлаа."
    ],
    bulletsEn: [
      "Started UB Vista serviced apartments in Songinokhairkhan district.",
      "Expanded Geo Petro Engineering and Mongolian Petroleum Engineering operations.",
      "Founded UB Real Estate LLC."
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400\u0026h=300\u0026fit=crop"
    ]
  },
  {
    year: "2013",
    titleMn: "Гэгээн тауэр",
    titleEn: "Geegeen Tower",
    bulletsMn: [
      "Өвөрхангай аймгийн Арвайхээр суманд Гэгээн тауэр үйлчилгээтэй орон сууцны барилгыг барьж ашиглалтанд оруулав.",
      "Барилга, үл хөдлөх хөрөнгийн салбарт хөдөө орон нутаг руу чиглэсэн анхны томоохон төсөлөө хэрэгжүүллээ.",
      "Орон нутгийн дэд бүтэц, хөгжлийн хөтөлбөрт хувь нэмэр оруулав."
    ],
    bulletsEn: [
      "Built and commissioned the Geegeen Tower serviced apartment building in Arvaikheer, Uvurkhangai province.",
      "Implemented the first major project aimed at rural areas in construction and real estate.",
      "Contributed to regional infrastructure and development programs."
    ],
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400\u0026h=300\u0026fit=crop"
    ]
  },
  {
    year: "2011",
    titleMn: "Евро стандартын үйлдвэр",
    titleEn: "Euro Standard Factory",
    bulletsMn: [
      "Евро стандартын вакум цонх, шилэн фасад үйлдвэрлэгч Гэрэлт Констракшн ХХК үүсгэн байгуулагдлаа.",
      "Барилгын материалын дотоод нийлүүлэлтийн сүлжээг бэхжүүлэв.",
      "Санхүүгийн салбарт Эм Эн Эф Эс ХХК тансаг зэрэглэлийн автомашин барьцаалан зээлдүүлэх үйлчилгээг эхлүүлэв."
    ],
    bulletsEn: [
      "Founded Gerelt Construction LLC, a manufacturer of Euro-standard vacuum windows and glass facades.",
      "Strengthened in-house construction material supply chain.",
      "Launched MNFS LLC luxury-car-secured lending services in finance."
    ],
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400\u0026h=300\u0026fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400\u0026h=300\u0026fit=crop"
    ]
  },
  {
    year: "2010",
    titleMn: "Газрын тос боловсруулах",
    titleEn: "Petroleum Processing",
    bulletsMn: [
      "Монголд анх удаа газрын тос боловсруулах үйлдвэрийг нөхөн сэргээв.",
      "Түүхий газрын тосны тээвэрлэлтийн үйл ажиллагааг эхлүүлэв.",
      "Дэд бүтцийн салбарт өргөн хэмжээний хөрөнгө оруулалт хийсэн."
    ],
    bulletsEn: [
      "First in Mongolia to restore a petroleum processing plant.",
      "Launched crude oil transportation operations.",
      "Made large-scale infrastructure investments."
    ],
    images: [
      "https://images.unsplash.com/photo-1516937941348-c09e55483d5e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504221507732-5246c045949b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2009",
    titleMn: "Газрын тосны тээвэр",
    titleEn: "Petroleum Transport",
    bulletsMn: [
      "Монгол Улсын хамгийн анхны газрын тосны технологийн тээвэр эрхэлсэн 100% үндэсний хөрөнгө оруулалттай компани болов.",
      "Тээвэр логистикийн салбарт анхдагч болон ажиллаж эхлэв.",
      "Байгаль орчинд ээлтэй технологийг нэвтрүүлэв."
    ],
    bulletsEn: [
      "Became Mongolia's first 100% national-investment petroleum technology transport company.",
      "Pioneered the transport and logistics sector.",
      "Introduced environmentally friendly technologies."
    ],
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop"
    ]
  },
  {
    year: "2006",
    titleMn: "Дорнын Их Гэгээ ХХК",
    titleEn: "Dornyn Ikh Gegee LLC",
    bulletsMn: [
      "Улаанбаатар групп нь Дорнын Их Гэгээ ХХК нэртэйгээр анх үүсгэн байгуулагдав.",
      "Барилга, дэд бүтцийн салбарт үйл ажиллагаагаа эхлүүлсэн.",
      "Монгол Улсын хөгжилд хувь нэмэр оруулах алсын хараагаар ажиллаж эхэлсэн."
    ],
    bulletsEn: [
      "Ulaanbaatar Group was founded as Dornyn Ikh Gegee LLC.",
      "Started operations in construction and infrastructure.",
      "Began working toward contributing to Mongolia's development."
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"
    ]
  },
];

/* ─── Chairman message section ─── */
function ChairmanSection({ locale }: { locale: string }) {
  const isMn = locale === "mn";
  const content = isMn ? chairmanMessage.mn : chairmanMessage.en;

  return (
    <section className="w-full py-20 lg:py-28 bg-[#F0F4F8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 lg:-inset-6 bg-white rounded-3xl shadow-lg" />
              <div
                className="relative h-[420px] lg:h-[520px] bg-cover bg-center rounded-2xl overflow-hidden shadow-xl"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&crop=face')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 text-sm font-medium tracking-wider uppercase mb-1">
                    {content.role}
                  </p>
                  <p className="text-white text-2xl font-bold">{content.signature}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="lg:pl-4">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-5 block">
                {content.label}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#000000] leading-tight mb-8 tracking-tight">
                {content.title}
              </h2>
              <div className="space-y-5 mb-10">
                {content.paragraphs.map((p, i) => (
                  <p key={i} className="text-[15px] lg:text-base text-[#334155] leading-[1.85]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-l-4 border-[#EC6707] shadow-sm">
                <Quote className="shrink-0 text-[#EC6707]" size={28} />
                <div>
                  <p className="text-[15px] text-[#334155] italic leading-relaxed mb-3">
                    {isMn
                      ? "Итгэл үнэмшил, хамтын зүтгэл, хариуцлага — энэ бол бидний үнэт зүйлс."
                      : "Belief, teamwork, and responsibility — these are our core values."}
                  </p>
                  <p className="text-sm font-semibold text-[#000000]">{content.signature}</p>
                  <p className="text-xs text-[#64748B]">{content.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const sectors = [
  { icon: TrendingUp, title: "Санхүү хөрөнгө, оруулалт", desc: "Стратегийн хөрөнгө оруулалт" },
  { icon: Building2, title: "Барилга, Үл хөдлөх хөрөнгө", desc: "Орон сууц, оффис, үйлдвэр" },
  { icon: Sparkles, title: "Лайфстайл", desc: "Амьдралын хэв маяг" },
  { icon: Truck, title: "Тээвэр логистик", desc: "Тээвэрлэлт, логистик" },
];

const achievements = [
  { icon: Award, title: "Шилдэг барилгын компани", org: "Монгол Улсын бизнесийн шагнал 2023" },
  { icon: FileCheck, title: "ISO 9001:2015", org: "Чанарын менежментийн систем" },
  { icon: Leaf, title: "LEED Gold", org: "Тогтвортой барилгын стандарт" },
  { icon: Handshake, title: "Олон улсын хамтын ажиллагаа", org: "Олон улсын консорциум" },
];

const team = [
  { name: "Ц.Батбаатар", role: "Төслөөн удирдах зөвлөлийн дарга", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face" },
  { name: "О.Гэрэл", role: "Ерөнхий захирал", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face" },
  { name: "Д.Түвшинбат", role: "Гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
  { name: "Б.Солонго", role: "Маркетинг, Борлуулалтын газрын захирал", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face" },
  { name: "Г.Баяржаргалан", role: "Санхүүгийн Ахлах Менежер", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&crop=face" },
];

const teamEn = [
  { name: "T. Batbaatar", role: "Chairman of the Board", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face" },
  { name: "O. Gerel", role: "Chief Executive Officer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face" },
  { name: "D. Tuvshinbat", role: "Executive Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
  { name: "B. Solongo", role: "Marketing & Sales Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face" },
  { name: "G. Bayarjargalan", role: "Senior Finance Manager", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&crop=face" },
];

const departments = [
  {
    titleMn: "UB Group",
    titleEn: "UB Group",
    members: team,
  },
  {
    titleMn: "UB Properties",
    titleEn: "UB Properties",
    members: [
      { name: "Б.Мөнхзолбоо", role: "Гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" },
      { name: "Д.Бадам", role: "Скай гарден резиденс ХХК-ийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face" },
      { name: "Ж.Сэлэнгэ", role: "Домог Импекс ХХК-ийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&crop=face" },
      { name: "Г.Амар", role: "Хөрөнгө оруулалтын захирал", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
      { name: "Б.Наран", role: "Борлуулалтын захирал", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face" },
    ],
  },
  {
    titleMn: "UB Construction",
    titleEn: "UB Construction",
    members: [
      { name: "Б.Гүшинжаргал", role: "UB Construction группийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face" },
      { name: "П.Ганчимэг", role: "Айсмарк ХХК-ийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face" },
      { name: "О.Доржханд", role: "Милко ХХК-ийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face" },
      { name: "Г.Бат-Эрдэнэ", role: "Төслийн менежер", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
      { name: "Д.Энхбат", role: "Барилгын инженер", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face" },
    ],
  },
  {
    titleMn: "UB Investment",
    titleEn: "UB Investment",
    members: [
      { name: "С.Эрдэнэбаяр", role: "UB Investment группийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" },
      { name: "Д.Одмаа", role: "Балансд Гроут Менежмент ҮЦК ХХК-ийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face" },
      { name: "С.Батбаяр", role: "Балансд Кредит ББСБ-ийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face" },
      { name: "Б.Баяр", role: "Санхүүгийн захирал", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
      { name: "Г.Энхжин", role: "Хөрөнгө оруулалтын аналитик", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&crop=face" },
    ],
  },
  {
    titleMn: "UB Logistics",
    titleEn: "UB Logistics",
    members: [
      { name: "Д.Болд", role: "UB Logistics-ийн гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
      { name: "Б.Саруул", role: "Тээврийн менежер", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" },
      { name: "Г.Мөнх", role: "Логистикийн захирал", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face" },
      { name: "О.Тэмүүлэн", role: "Түлшний тээврийн хариуцсан захирал", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face" },
      { name: "Н.Энх-Амгалан", role: "Операцийн менежер", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face" },
    ],
  },
];

/* ─── Teso-style history timeline ─── */
function HistoryTimeline({ locale }: { locale: string }) {
  const isMn = locale === "mn";
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = historyTimeline[activeIndex];
  const years = historyTimeline.map((i) => i.year);

  const move = (direction: "left" | "right") => {
    setActiveIndex((prev) => {
      if (direction === "left") return Math.max(prev - 1, 0);
      return Math.min(prev + 1, historyTimeline.length - 1);
    });
  };

  return (
      <section className="w-full pt-4 pb-20 lg:pb-28 bg-[#F0F4F8] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10 lg:mb-14">
        <Reveal className="text-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
            {isMn ? "Бидний аялал" : "Our Journey"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] tracking-tight">
            {isMn ? "Компанийн түүх" : "Company History"}
          </h2>
        </Reveal>
      </div>

      {/* Year selector pill */}
      <Reveal className="mx-auto max-w-7xl px-6 lg:px-8 mb-12 lg:mb-16">
        <div className="flex items-center justify-between gap-4 bg-white rounded-full px-6 sm:px-8 lg:px-12 py-5 shadow-sm border border-[#E2E8F0] w-full max-w-6xl mx-auto">
          <button
            onClick={() => move("left")}
            disabled={activeIndex === 0}
            aria-label={isMn ? "Өмнөх" : "Previous"}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[#000000] hover:bg-[#F0F4F8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto scrollbar-hide px-2 flex-1">
            {years.map((year, index) => (
              <button
                key={year}
                onClick={() => setActiveIndex(index)}
                className={`text-base sm:text-lg lg:text-xl font-semibold whitespace-nowrap transition-colors duration-300 ${
                  index === activeIndex ? "text-[#EC6707]" : "text-[#64748B] hover:text-[#000000]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <button
            onClick={() => move("right")}
            disabled={activeIndex === historyTimeline.length - 1}
            aria-label={isMn ? "Дараах" : "Next"}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[#000000] hover:bg-[#F0F4F8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </Reveal>

      {/* Content grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.year}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start"
          >
            {/* Image grid */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              {activeItem.images.map((src, index) => (
                <motion.div
                  key={`${activeItem.year}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`relative overflow-hidden rounded-xl lg:rounded-2xl bg-[#E2E8F0] ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${src}')`, aspectRatio: index === 0 ? "4/3" : "4/3" }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Text content */}
            <div className="lg:pt-4">
              <span className="text-[#EC6707] text-5xl lg:text-7xl font-bold tracking-tight block mb-6">
                {activeItem.year}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-[#000000] mb-6">
                {isMn ? activeItem.titleMn : activeItem.titleEn}
              </h3>
              <ul className="space-y-4">
                {(isMn ? activeItem.bulletsMn : activeItem.bulletsEn).map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-[15px] lg:text-base text-[#334155] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#EC6707] shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Leadership departments with horizontal swipe ─── */
function TeamSlider({ locale }: { locale: string }) {
  const isMn = locale === "mn";

  return (
    <section className="w-full py-20 lg:py-28 bg-[#F0F4F8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center mb-14 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            {isMn ? (
              <>
                <span className="text-[#EC6707] text-2xl sm:text-3xl lg:text-4xl">Удирдлагын</span>{" "}
                <span className="text-[#000000]">баг</span>
              </>
            ) : (
              <>
                <span className="text-[#EC6707] text-2xl sm:text-3xl lg:text-4xl">Leadership</span>{" "}
                <span className="text-[#000000]">Team</span>
              </>
            )}
          </h2>
        </Reveal>

        <div className="space-y-16 lg:space-y-24">
          {departments.map((dept, deptIndex) => (
            <DepartmentRow
              key={dept.titleMn}
              dept={dept}
              deptIndex={deptIndex}
              isMn={isMn}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DepartmentRow({
  dept,
  deptIndex,
  isMn,
}: {
  dept: (typeof departments)[0];
  deptIndex: number;
  isMn: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 16;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <Reveal delay={deptIndex * 0.1}>
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-center text-[#000000] mb-8 lg:mb-10">
          {isMn ? dept.titleMn : dept.titleEn}
        </h3>

        <div className="relative group/slider">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label={isMn ? "Өмнөх" : "Previous"}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 w-11 h-11 rounded-full bg-white border border-[#E2E8F0] text-[#000000] shadow-md flex items-center justify-center hover:bg-[#EC6707] hover:text-white hover:border-[#EC6707] transition-all z-10 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {dept.members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative shrink-0 w-[260px] sm:w-[280px] snap-start bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${member.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <p className="text-white/60 text-[11px] font-medium tracking-wider uppercase mb-1">
                    {isMn ? dept.titleMn : dept.titleEn}
                  </p>
                  <h4 className="text-white text-xl lg:text-2xl font-bold mb-1">
                    {member.name}
                  </h4>
                  <p className="text-white/70 text-sm leading-snug">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label={isMn ? "Дараах" : "Next"}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 w-11 h-11 rounded-full bg-white border border-[#E2E8F0] text-[#000000] shadow-md flex items-center justify-center hover:bg-[#EC6707] hover:text-white hover:border-[#EC6707] transition-all z-10 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";
  const isMn = locale === "mn";

  return (
    <div>
      {/* HERO */}
      <section className="relative w-full pt-24 pb-16 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/40 to-[#000000]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-6 block">
              {isMn ? "Бидний тухай" : "About Us"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
              {isMn ? "Монгол Улсыг" : "Mongolia's"}
              <br />
              <span className="text-[#EC6707]">{isMn ? "2006 оноос" : "Future since 2006"}</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed mx-auto">
              {isMn
                ? "Барилга, дэд бүтэц, хөрөнгө оруулалтын салбарт 18 жилийн туршлага."
                : "18 years of experience in construction, infrastructure, and investment."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CHAIRMAN MESSAGE */}
      <ChairmanSection locale={locale} />

      {/* VISION, MISSION & VALUES */}
      <section className="w-full py-16 lg:py-12 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              Бидний үндэс
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              Алсын хараа, Эрхэм зорилго, Үнэт зүйлс
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Reveal delay={0}>
              <div className="bg-[#F0F4F8] rounded-2xl p-4 text-center flex flex-col items-center h-full shadow-sm border border-[#E2E8F0]">
                <div className="w-20 h-20 rounded-full border border-[#EC6707]/20 flex items-center justify-center mb-5">
                  <Eye size={32} className="text-[#EC6707]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-6">Алсын хараа</h3>
                <p className="text-[15px] text-[#334155] leading-relaxed flex-grow">
                  Тогтвортой, хүртээмжтэй өгөөжийг бий болгосон хөгжүүлэгч компани болно.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-[#F0F4F8] rounded-2xl p-4 text-center flex flex-col items-center h-full shadow-sm border border-[#E2E8F0]">
                <div className="w-20 h-20 rounded-full border border-[#EC6707]/20 flex items-center justify-center mb-5">
                  <Target size={32} className="text-[#EC6707]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-6">Эрхэм зорилго</h3>
                <p className="text-[15px] text-[#334155] leading-relaxed flex-grow">
                  Дэвшилтэт шийдэл, олон улсын стандартыг хүсэл тэмүүлэл, ур чадвартай холбон Монгол Улсын хөгжилд хувь нэмрээ оруулна.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[#F0F4F8] rounded-2xl p-4 text-center flex flex-col items-center h-full shadow-sm border border-[#E2E8F0]">
                <div className="w-20 h-20 rounded-full border border-[#EC6707]/20 flex items-center justify-center mb-5">
                  <Star size={32} className="text-[#EC6707]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-6">Үнэт зүйлс</h3>
                <p className="text-[15px] text-[#334155] leading-relaxed flex-grow">
                  Тогтвортой хөгжил, Хамтын зүтгэл, Дэвшилтэт технологи, Чанар, Ёс зүй, Хүндэтгэл
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="w-full py-16 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              Тоогоор
            </span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">
              Бидний ололт амжилт
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { value: 18, suffix: "+", label: "Жилийн туршлага" },
              { value: 50, suffix: "+", label: "Гүйцэтгэсэн төсөл" },
              { value: 2000, suffix: "+", label: "Ажилтан" },
              { value: 150, suffix: "+", label: "Хамтрагч байгууллага" },
              { value: 2, suffix: "B+", label: "Хөрөнгө оруулалт" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                <div className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-2xl text-center p-5 shadow-sm">
                  <div className="text-4xl lg:text-5xl font-bold text-[#EC6707] mb-4 tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="h-px w-12 bg-[#EC6707]/20 mx-auto mb-4" />
                  <div className="text-[12px] text-[#64748B] tracking-[0.15em] uppercase">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE — horizontal scroll */}
      <HistoryTimeline locale={locale} />

      {/* TEAM — leadership slider */}
      <TeamSlider locale={locale} />

      {/* CTA + SLOGAN */}
      <section className="relative w-full py-16 lg:py-20 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/60 to-[#000000]/80" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-[#EC6707] text-sm font-semibold tracking-[0.25em] uppercase mb-6">
              {isMn ? "Бидний уриа" : "Our Slogan"}
            </p>
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              {isMn ? (
                <span>
                  Ирээдүйг
                  <br />
                  <span className="text-[#EC6707]">хамтдаа бүтээе</span>
                </span>
              ) : (
                <span>
                  Building the
                  <br />
                  <span className="text-[#EC6707]">Future Together</span>
                </span>
              )}
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
              {isMn
                ? "Монгол Улсын тэргүүлэгч барилгын компанитай хамтран ажиллаарай."
                : "Partner with Mongolia's leading construction and infrastructure group."}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#EC6707] text-white text-sm font-semibold tracking-wide hover:bg-[#B35405] transition-all duration-500 rounded-sm"
            >
              {isMn ? "Холбоо барих" : "Contact Us"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

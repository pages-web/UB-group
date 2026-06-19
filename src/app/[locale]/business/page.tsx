"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, X, ExternalLink } from "lucide-react";

/* ─── Types ─── */
interface Project {
  id: string;
  name: string;
  description?: string;
  location?: string;
  year?: string;
  area?: string;
  features?: string[];
  images?: string[];
  mapUrl?: string;
  website?: string;
}

interface SubCategory {
  id: string;
  name: string;
  projects: Project[];
}

interface Sector {
  id: string;
  name: string;
  subCategories?: SubCategory[];
  projects?: Project[];
}

/* ─── Data ─── */
const sectors: Sector[] = [
  {
    id: "construction",
    name: "Барилгын төслүүд",
    subCategories: [
      {
        id: "planned",
        name: "Хэрэгжүүлэхээр төлөвлөсөн төслүүд",
        projects: [
          {
            id: "vision-complex",
            name: "Vision complex",
            description: "Олон үйлчилгээт цогцолбор",
            location: "Улаанбаатар",
            year: "2026",
            area: "35,000 м²",
            features: [
              "Оффис, худалдаа, үйлчилгээний цогцолбор",
              "Доороо 3 давхар underground зогсоол",
              "Ногоон дээвэртэй байгальд ээлтэй дизайн",
              "24/7 аюулгүй байдлын систем",
              "Олон улсын стандартын лифт систем",
            ],
            images: [
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.905!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzE4LjAiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "vision-tower",
            name: "Vision business tower",
            description: "26 давхар оффисын барилга",
            location: "Хан-Уул дүүрэг",
            year: "2027",
            area: "45,000 м²",
            features: [
              "26 давхар А зэрэглэлийн оффисын барилга",
              "Давхар бүрт 1,500 м² нээлтэй талбай",
              " LEED сертификаттай байгальд ээлтэй барилга",
              "Дээд давхарт rooftop хурлын танхим",
              "Доороо 2 давхар underground зогсоол",
            ],
            images: [
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.893!3d47.886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUzJzA5LjYiTiAxMDbCsDUzJzM0LjgiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "tokyo-garden",
            name: "Tokyo garden",
            description: "Орон сууцны хороолол",
            location: "Улаанбаатар",
            year: "2025",
            area: "28,000 м²",
            features: [
              "120 айлын орчин үеийн орон сууцны хороолол",
              "Японы цэцэрлэгт хүрээлэн загварчлал",
              "Хүүхдийн тоглоомын талбай, фитнессийн төв",
              "Доороо 1 давхар underground зогсоол",
              "24/7 харуул хамгаалалт",
            ],
            images: [
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "skyland",
            name: "Skyland",
            description: "Үл хөдлөх хөрөнгийн төсөл",
            location: "Улаанбаатар",
            year: "2026",
            area: "50,000 м²",
            features: [
              "Үл хөдлөх хөрөнгийн хөгжлийн томоохон төсөл",
              "Орон сууц, оффис, худалдааны цогцолбор",
              "Төв зам дагуу стратегийн байршил",
              "Ногоон бүс, нийтийн талбай",
              "Олон улсын стандартын инженеринг",
            ],
            images: [
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
              "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80",
              "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "sky-park",
            name: "Sky Park",
            description: "Байгаль орчинг хамгаалсан орон сууц",
            location: "Улаанбаатар",
            year: "2025",
            area: "18,000 м²",
            features: [
              "80 айлын байгальд ээлтей орон сууц",
              "Ногоон дээвэр, харуулын цэцэрлэг",
              "Нарны дулааны панель бүхий барилга",
              "Хүүхдийн тоглоомын талбай",
              "Доороо 1 давхар underground зогсоол",
            ],
            images: [
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "provision-plaza",
            name: "Provision plaza",
            description: "Худалдаа, үйлчилгээний төв",
            location: "Улаанбаатар",
            year: "2026",
            area: "22,000 м²",
            features: [
              "3 давхар худалдаа, үйлчилгээний төв",
              "Супермаркет, ресторан, кино театр",
              "Доороо 2 давхар underground зогсоол",
              "Олон улсын брэндүүдийн дэлгүүр",
              "Нийтийн үйлчилгээний талбай",
            ],
            images: [
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
              "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "life-style",
            name: "Life style complex",
            description: "Амьдралын хэв маягийн цогцолбор",
            location: "Улаанбаатар",
            year: "2027",
            area: "40,000 м²",
            features: [
              "Орон сууц, фитнесс, ресторан, дэлгүүр бүхий цогцолбор",
              "Ногоон бүс, замын цэцэрлэг",
              "24/7 аюулгүй байдлын систем",
              "Доороо 2 давхар underground зогсоол",
              "Олон улсын стандартын барилга",
            ],
            images: [
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "central-park",
            name: "Central park",
            description: "Ногоон байгууламжтай орон сууц",
            location: "Улаанбаатар",
            year: "2025",
            area: "15,000 м²",
            features: [
              "60 айлын ногоон байгууламжтай орон сууц",
              "Төв цэцэрлэг, хүүхдийн тоглоомын талбай",
              "Нарны дулааны панель",
              "Доороо 1 давхар underground зогсоол",
              "24/7 харуул хамгаалалт",
            ],
            images: [
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
        ],
      },
      {
        id: "completed",
        name: "Хэрэгжүүлсэн төслүүд",
        projects: [
          {
            id: "eh-nyarai",
            name: "Эх нярай эмэгтэйчүүдийн үндэсний төв",
            description: "ЭХЭМҮТ-ийн барилга",
            location: "Улаанбаатар",
            year: "2018",
            area: "25,000 м²",
            features: [
              "Үндэсний эх нярай, эмэгтэйчүүдийн төвийн барилга",
              "200 ортой эмнэлэг",
              "Давхар бүрт мэргэжлийн тасаг",
              "Доороо 2 давхар underground зогсоол",
              "Олон улсын стандартын эмнэлгийн тоног төхөөрөмж",
            ],
            images: [
              "https://images.unsplash.com/photo-1587351021759-3e566b934af7?w=800&q=80",
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "seoul-garden",
            name: "Сөүл гарден цогцолбор",
            description: "Орон сууцны хороолол",
            location: "Хан-Уул дүүрэг",
            year: "2020",
            area: "18,000 м²",
            features: [
              "100 айлын орчин үеийн орон сууцны хороолол",
              "БНСУ-ын загварчлал, цэцэрлэгт хүрээлэн",
              "Хүүхдийн тоглоомын талбай, фитнессийн төв",
              "Доороо 1 давхар underground зогсоол",
              "24/7 харуул хамгаалалт",
            ],
            images: [
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
              "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80",
              "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.893!3d47.886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUzJzA5LjYiTiAxMDbCsDUzJzM0LjgiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "vip-office",
            name: "VIP Оффис",
            description: "Бизнес зэрэглэлийн оффис",
            location: "Улаанбаатар",
            year: "2019",
            area: "8,000 м²",
            features: [
              "Бизнес зэрэглэлийн 12 давхар оффисын барилга",
              "Давхар бүрт 600 м² нээлтэй талбай",
              "Доороо 2 давхар underground зогсоол",
              "24/7 аюулгүй байдлын систем",
              "Олон улсын стандартын лифт систем",
            ],
            images: [
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "ub-vista",
            name: "UB vista",
            description: "Үйлчилгээтэй орон сууц",
            location: "Сонгинохайрхан дүүрэг",
            year: "2021",
            area: "6,000 м²",
            features: [
              "40 айлын үйлчилгээтэй орон сууц",
              "Доороо 1 давхар худалдаа, үйлчилгээний талбай",
              "Хүүхдийн тоглоомын талбай",
              "24/7 харуул хамгаалалт",
              "Доороо 1 давхар underground зогсоол",
            ],
            images: [
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
              "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.778!3d47.916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU0JzU3LjYiTiAxMDbCsDQ2JzQwLjgiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "ub-autocom",
            name: "UB Autocom",
            description: "Автомашины худалдааны төв",
            location: "Улаанбаатар",
            year: "2020",
            area: "12,000 м²",
            features: [
              "Автомашины худалдаа, үйлчилгээний цогцолбор",
              "3 давхар шоурум, засварын үйлчилгээ",
              "Доороо 1 давхар underground зогсоол",
              "Олон улсын брэндүүдийн албан ёсны дилер",
              "24/7 харуул хамгаалалт",
            ],
            images: [
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "itc-tower",
            name: "ITC Tower",
            description: "Олон улсын бизнесийн төв",
            location: "Сүхбаатар дүүрэг 1-р хороо, ЭМЯамны замын баруун талд",
            year: "2023",
            area: "55,000 м²",
            features: [
              "17 давхар олон улсын бизнесийн төв",
              "Оффис, худалдаа, үйлчилгээний цогцолбор",
              "Доороо 2 давхар underground зогсоол",
              "LEED Gold сертификаттай байгальд ээлтэй барилга",
              "Олон улсын стандартын лифт систем",
            ],
            images: [
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "avenue-residence",
            name: "Avenue residence",
            description: "55 айлын бизнес зэрэглэлийн орон сууц",
            location: "Чингэлтэй дүүрэг 2-р хороо",
            year: "2022",
            area: "7,500 м²",
            features: [
              "55 айлын бизнес зэрэглэлийн орон сууц",
              "Орчин үеийн дизайн, өндөр чанарын материал",
              "Доороо 1 давхар underground зогсоол",
              "24/7 харуул хамгаалалт",
              "Хүүхдийн тоглоомын талбай",
            ],
            images: [
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.938!3d47.923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzIyLjgiTiAxMDbCsDU2JzE2LjgiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "Санхүү, хөрөнгө оруулалт",
    projects: [
      {
        id: "ub-active",
        name: "Юу Би Актив ББСБ ХХК",
        description: "Банк бус санхүүгийн байгууллага",
        location: "Улаанбаатар",
        year: "2015",
        area: "2,500 м²",
        features: [
          "Банк бус санхүүгийн үйлчилгээ",
          "Бизнес зээл, хувь хүний зээл",
          "Мэргэжлийн зөвлөгөө",
          "Онлайн зээлийн үйлчилгээ",
          "Хурдан шуурхай зээлийн шийдвэр",
        ],
            images: [
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
              "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "mnfs",
        name: "Эм Эн Эф Эс ХХК",
        description: "Тансаг зэрэглэлийн автомашин барьцаалан зээлдүүлэх үйлчилгээ",
        location: "Улаанбаатар",
        year: "2018",
        area: "1,800 м²",
        features: [
          "Тансаг зэрэглэлийн автомашин барьцаалан зээлдүүлэх",
          "Богино хугацааны зээлийн үйлчилгээ",
          "Мэргэжлийн үнэлгээ",
          "Байршилтай хадгалалт",
          "Хурдан шуурхай үйлчилгээ",
        ],
            images: [
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
              "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
        ],
      },
      {
        id: "transport",
    name: "Тээвэр",
    projects: [
      {
        id: "ub-concrete",
        name: "Хай Юу Би Конкрийт",
        description: "Бетон зуурмагны үйлдвэр",
        location: "Улаанбаатар",
        year: "2017",
        area: "15,000 м²",
        features: [
          "Бетон зуурмагны үйлдвэрлэл",
          "Өдөрт 500 м³ хүчин чадал",
          "Мэргэжлийн лаборатори",
          "Тээвэрлэлтийн үйлчилгээ",
          "ISO 9001 чанарын стандарт",
        ],
            images: [
              "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "tbn-trans",
        name: "Ти Би Эн Си Транс ХХК",
        description: "Тээвэр зуучлал",
        location: "Улаанбаатар",
        year: "2016",
        area: "8,000 м²",
        features: [
          "Олон улсын тээвэр зуучлал",
          "Ачаа тээвэрлэлтийн үйлчилгээ",
          "Мэргэжлийн логистикийн зөвлөгөө",
          "GPS хяналттай тээвэр",
          "ISO 9001 чанарын стандарт",
        ],
            images: [
              "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
              "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "talst",
        name: "Талстдорнод Транс ХХК",
        description: "Газрын тосны тээвэрлэлт",
        location: "Улаанбаатар",
        year: "2019",
        area: "20,000 м²",
        features: [
          "Газрын тосны тээвэрлэлт",
          "Тусгай зөвшөөрөлтэй тээвэр",
          "Мэргэжлийн жолооч нар",
          "GPS хяналттай тээвэр",
          "ISO 9001 чанарын стандарт",
        ],
            images: [
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "mongolian-petroleum",
        name: "Монголиан Петролиум Инженеринг ХХК",
        description: "Газрын тосны инженеринг",
        location: "Улаанбаатар",
        year: "2015",
        area: "10,000 м²",
        features: [
          "Газрын тосны инженерингийн үйлчилгээ",
          "Мэргэжлийн инженерийн зөвлөгөө",
          "Тоног төхөөрөмжийн ханган нийлүүлэлт",
          "Техникийн засвар үйлчилгээ",
          "ISO 9001 чанарын стандарт",
        ],
            images: [
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "duruu",
        name: "Дөрвөн Уул Хан Хайрхан ХХК",
        description: "Тээвэр логистик",
        location: "Улаанбаатар",
        year: "2014",
        area: "12,000 м²",
        features: [
          "Тээвэр логистикийн үйлчилгээ",
          "Ачаа тээвэрлэлт",
          "Мэргэжлийн логистикийн зөвлөгөө",
          "GPS хяналттай тээвэр",
          "ISO 9001 чанарын стандарт",
        ],
            images: [
              "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "dorngiin-ih-gegee",
        name: "Дорнын Их Гэрэгэ ХХК",
        description: "Газрын тосны технологийн тээвэр",
        location: "Улаанбаатар",
        year: "2018",
        area: "15,000 м²",
        features: [
          "Газрын тосны технологийн тээвэрлэлт",
          "Тусгай зөвшөөрөлтэй тээвэр",
          "Мэргэжлийн жолооч нар",
          "GPS хяналттай тээвэр",
          "ISO 9001 чанарын стандарт",
        ],
            images: [
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
              "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
        ],
      },
      {
        id: "lifestyle",
    name: "Лайфстайл",
    projects: [
      {
        id: "yoshinoya",
        name: "Yoshinoya",
        description: "Японы №1 түргэн хоолны сүлжээ ресторан",
        location: "Улаанбаатар",
        year: "2019",
        area: "500 м²",
        features: [
          "Японы №1 түргэн хоолны сүлжээ",
          "Говь, гүрж, тахианы махтай рамен",
          "Хурдан үйлчилгээ, чанарын хоол",
          "Дэлхийд 2,000 гаруй салбартай",
          "Монголд анхны салбар",
        ],
            images: [
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
              "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "proteam",
        name: "PROTEAM",
        description: "Орчин үеийн фитнессийн төв",
        location: "Тусгаар тогтнолын ордны 4 давхар",
        year: "2020",
        area: "1,200 м²",
        features: [
          "Орчин үеийн фитнессийн төв",
          "Хүчний дасгал, кардио тоног төхөөрөмж",
          "Хувийн дасгалжуулагчтай хичээл",
          "Бүлгийн дасгалын хичээл",
          "24/7 нээлттэй",
        ],
            images: [
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
              "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
          {
            id: "benebene",
        name: "BeneBene",
        description: "БНСУ-ын хүүхдийн хувцасны дэлгүүр",
        location: "Улсын Их Дэлгүүрийн 5 давхар",
        year: "2021",
        area: "300 м²",
        features: [
          "БНСУ-ын хүүхдийн хувцасны дэлгүүр",
          "0-14 насны хүүхдийн хувцас",
          "Чанарын материал, загварлаг дизайн",
          "Улирлын шинэ коллекц",
          "Улсын Их Дэлгүүрийн 5 давхар",
        ],
            images: [
              "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
        ],
      },
      {
        id: "management",
    name: "Менежмент",
    projects: [
      {
        id: "ub-real-estate",
        name: "Юу Би Рийл Эстэйт ХХК",
        description: "Үл хөдлөх хөрөнгө зуучлал, менежмент",
        location: "Улаанбаатар",
        year: "2016",
        area: "2,000 м²",
        features: [
          "Үл хөдлөх хөрөнгө зуучлал",
          "Барилгын менежмент",
          "Хөрөнгө оруулалтын зөвлөгөө",
          "Үнэлгээ, судалгаа",
          "Мэргэжлийн баг",
        ],
            images: [
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
              "https://images.unsplash.com/photo-1545324418-cc6a8d79dfac?w=800&q=80",
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
            ],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21369.85448948464!2d106.917!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzQxLjIiRQ!5e0!3m2!1smn!2smn!4v1600000000000!5m2!1smn!2smn",
            website: "https://ub-group.mn",
          },
        ],
      },
];

/* ─── SubCategory Accordion ─── */
function SubCategoryAccordion({
  sub,
  onSelectProject,
  selectedProjectId,
}: {
  sub: SubCategory;
  onSelectProject: (project: Project) => void;
  selectedProjectId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 px-2 hover:bg-[#E8EEF4] transition-colors"
      >
        <span className="text-[13px] font-medium text-[#64748B]">{sub.name}</span>
        <ChevronDown
          size={14}
          className={`text-[#EC6707] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-0">
              {sub.projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-[14px] ${
                    selectedProjectId === project.id
                      ? "bg-[#F5F3ED] text-[#EC6707] font-medium"
                      : "text-[#334155] hover:bg-[#E8EEF4] hover:text-[#EC6707]"
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Components ─── */
function AccordionItem({
  sector,
  isOpen,
  onToggle,
  onSelectProject,
  selectedProjectId,
}: {
  sector: Sector;
  isOpen: boolean;
  onToggle: () => void;
  onSelectProject: (project: Project) => void;
  selectedProjectId?: string;
}) {
  return (
    <div className="border-b border-[#E2E8F0]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-2 hover:bg-[#E8EEF4] transition-colors"
      >
        <span className="text-[15px] font-medium text-[#000000]">{sector.name}</span>
        <ChevronDown
          size={18}
          className={`text-[#EC6707] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-2">
              {/* If sector has subCategories */}
              {sector.subCategories?.map((sub) => (
                <SubCategoryAccordion
                  key={sub.id}
                  sub={sub}
                  onSelectProject={onSelectProject}
                  selectedProjectId={selectedProjectId}
                />
              ))}

              {/* If sector has flat projects list */}
              {sector.projects?.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors text-[14px] mb-0.5 ${
                    selectedProjectId === project.id
                      ? "bg-[#F5F3ED] text-[#EC6707] font-medium"
                      : "text-[#334155] hover:bg-[#E8EEF4] hover:text-[#EC6707]"
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const images = project.images || [];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-xl overflow-hidden shadow-lg"
    >
      {/* Close button */}
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
        >
          <X size={18} className="text-[#000000]" />
        </button>
      </div>

      <div className="p-5">
        {/* Images Grid */}
        {images.length > 0 && (
          <div className="mb-6">
            <div className={`grid gap-3 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {images.slice(0, 3).map((img, index) => (
                <div 
                  key={index}
                  className={`relative overflow-hidden rounded-lg bg-[#E8EEF4] ${
                    images.length === 3 && index === 0 ? 'col-span-2 h-56' : 'h-48'
                  } ${images.length === 2 ? 'h-56' : ''} ${images.length === 1 ? 'h-64' : ''}`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${img}')` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-[#000000] mb-2">{project.name}</h2>
        
        {/* Description */}
        {project.description && (
          <p className="text-[15px] text-[#334155] mb-4 leading-relaxed">{project.description}</p>
        )}

        {/* Location */}
        {project.location && (
          <div className="flex items-center gap-2 text-sm text-[#EC6707] mb-6">
            <MapPin size={16} />
            {project.location}
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#000000] mb-3">Төслийн онцлог</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-[14px] text-[#334155]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EC6707] mt-1.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Website Link */}
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#EC6707] text-white text-sm font-medium rounded-lg hover:bg-[#B35405] transition-colors mb-6"
          >
            Төслийн вэб рүү зочлох
            <ExternalLink size={16} />
          </a>
        )}

        {/* Map */}
        {project.mapUrl && (
          <div className="mt-4">
            <h3 className="text-[13px] font-semibold text-[#000000] mb-3">Байршил</h3>
            <div className="relative h-48 bg-[#E8EEF4] rounded-lg overflow-hidden">
              <iframe
                src={project.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function BusinessPage() {
  const [openSector, setOpenSector] = useState<string | null>("construction");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-24 pb-16 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/40 to-[#000000]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Бизнес
            </h1>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="w-full py-16 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* LEFT: Accordion */}
            <div className="w-full lg:w-[250px] flex-shrink-0">
              <div className="border-t border-[#E2E8F0]">
                {sectors.map((sector) => (
                  <AccordionItem
                    key={sector.id}
                    sector={sector}
                    isOpen={openSector === sector.id}
                    onToggle={() =>
                      setOpenSector(openSector === sector.id ? null : sector.id)
                    }
                    onSelectProject={(project) => setSelectedProject(project)}
                    selectedProjectId={selectedProject?.id}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Project Detail */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <ProjectDetail
                    key={selectedProject.id}
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#E8EEF4] border border-[#E2E8F0] rounded-xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center"
                  >
                    <p className="text-[#94A3B8] text-lg">
                      Төсөл сонгоно уу
                    </p>
                    <p className="text-[#64748B] text-sm mt-2">
                      Зүүн талаас төсөл сонгож, дэлгэрэнгүй мэдээлэл харах боломжтой
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

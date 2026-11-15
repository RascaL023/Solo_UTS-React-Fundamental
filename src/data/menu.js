const menus = [
  {
    id: 1,
    name: "Classic Espresso",
    category: "Espresso",
    price: 18000,
    stock: 50,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/4c56f8822-85b0-4401-a4e8-7d983303cf236436.png",
    description:
      "Shot espresso murni dengan crema tebal dan aroma kuat. Disajikan panas dalam cangkir kecil 50ml.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Hot Coffee",
    price: 28000,
    stock: 35,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/1c56f8822-85b0-4401-a4e8-7d983303cf236203.png",
    description:
      "Perpaduan espresso, susu steamed, dan foam tebal dengan latte art cantik. Cita rasa lembut dan seimbang.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Cinnamon Spice Latte",
    category: "Hot Coffee",
    price: 30000,
    stock: 20,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/5c56f8822-85b0-4401-a4e8-7d983303cf238539.png",
    description:
      "Latte hangat dengan taburan kayu manis dan sentuhan bunga lawang. Hangat dan aromatik, cocok untuk cuaca dingin.",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Caffe Latte",
    category: "Hot Coffee",
    price: 27000,
    stock: 40,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/3c56f8822-85b0-4401-a4e8-7d983303cf239000.png",
    description:
      "Espresso dengan susu steamed melimpah dan heart latte art. Rasa creamy yang ringan dan mudah dinikmati.",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Flat White",
    category: "Hot Coffee",
    price: 29000,
    stock: 25,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/4c56f8822-85b0-4401-a4e8-7d983303cf234949.png",
    description:
      "Double shot espresso dengan microfoam susu yang lembut dan tipis. Rasa kopi lebih menonjol dibanding latte.",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Caffe Mocha",
    category: "Hot Coffee",
    price: 32000,
    stock: 18,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/1c56f8822-85b0-4401-a4e8-7d983303cf236893.png",
    description:
      "Perpaduan espresso, cokelat premium, dan susu steamed dengan taburan cocoa. Manis dan kaya rasa.",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Caramel Macchiato",
    category: "Signature",
    price: 33000,
    stock: 22,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/0c56f8822-85b0-4401-a4e8-7d983303cf234399.png",
    description:
      "Vanilla latte dengan foam tebal dan drizzle karamel manis di atasnya. Signature drink yang jadi favorit.",
    rating: 4.9,
  },
  {
    id: 8,
    name: "Iced Americano",
    category: "Iced Coffee",
    price: 25000,
    stock: 60,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/0c56f8822-85b0-4401-a4e8-7d983303cf233259.png",
    description:
      "Double shot espresso diseduh dengan air dingin dan es batu. Segar, ringan, tanpa gula.",
    rating: 4.4,
  },
  {
    id: 9,
    name: "Iced Latte",
    category: "Iced Coffee",
    price: 28000,
    stock: 45,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/5c56f8822-85b0-4401-a4e8-7d983303cf236393.png",
    description:
      "Espresso dan susu dingin berlayer cantik dalam gelas, disajikan dengan es batu. Creamy dan menyegarkan.",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Vanilla Iced Latte",
    category: "Iced Coffee",
    price: 30000,
    stock: 30,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/4c56f8822-85b0-4401-a4e8-7d983303cf232870.png",
    description:
      "Iced latte dengan sirup vanilla asli dan lapisan susu yang mulus. Manis lembut dengan aroma vanilla.",
    rating: 4.8,
  },
  {
    id: 11,
    name: "Caramel Iced Coffee",
    category: "Iced Coffee",
    price: 31000,
    stock: 28,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/2c56f8822-85b0-4401-a4e8-7d983303cf234956.png",
    description:
      "Kopi dingin dengan karamel yang tercampur sempurna, menghasilkan swirl cokelat keemasan yang menggoda.",
    rating: 4.6,
  },
  {
    id: 12,
    name: "Cold Brew Coffee",
    category: "Iced Coffee",
    price: 30000,
    stock: 15,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/5c56f8822-85b0-4401-a4e8-7d983303cf232859.png",
    description:
      "Kopi diseduh dingin selama 12 jam sehingga rasanya halus, rendah asam, dan disajikan dalam botol premium.",
    rating: 4.7,
  },
  {
    id: 13,
    name: "Affogato",
    category: "Signature",
    price: 35000,
    stock: 12,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/1c56f8822-85b0-4401-a4e8-7d983303cf236601.png",
    description:
      "Satu scoop es krim vanilla disiram shot espresso panas. Perpaduan dessert dan kopi yang unik.",
    rating: 4.9,
  },
  {
    id: 14,
    name: "Vietnamese Iced Coffee",
    category: "Signature",
    price: 28000,
    stock: 20,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/2c56f8822-85b0-4401-a4e8-7d983303cf234176.png",
    description:
      "Ca phe sua da: kopi tubruk Vietnam diseduh dengan phin, disajikan dengan susu kental manis dan foam.",
    rating: 4.5,
  },
  {
    id: 15,
    name: "Turkish Coffee",
    category: "Traditional",
    price: 25000,
    stock: 10,
    image:
      "https://image.qwenlm.ai/public_source/da25218e-a952-4db9-be8f-123a03396a54/0c56f8822-85b0-4401-a4e8-7d983303cf231786.png",
    description:
      "Kopi tradisional Turki diseduh dalam cezve tembaga, menghasilkan busa tebal dan rasa yang kuat serta pekat.",
    rating: 4.3,
  },
];

export default menuData;

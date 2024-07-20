import { Language } from "@core/api/types";
import { genTextsGetter } from "@core/utils/language";

interface Definition {
  title: string;
}

const FR: Definition = {
  title: "coucou",
};

export default genTextsGetter(new Map([[Language.French, FR]]));

import { tips } from "@/data/recipes";
import { useLang } from "@/contexts/LangContext";

const TipsSection = () => {
  const { lang, t } = useLang();

  return (
    <div className="p-4 pb-24 md:pb-8 animate-fade-in">
      <h2 className="font-display font-bold text-xl text-foreground mb-1">
        {t("healthTips")}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {lang === "uz"
          ? "Sog'lom ovqatlanish uchun foydali maslahatlar"
          : "Useful tips for healthy eating"}
      </p>

      <div className="space-y-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-card border border-border rounded-xl p-4 flex gap-3 animate-fade-in"
          >
            <div className="text-2xl flex-shrink-0 mt-0.5">{tip.icon}</div>
            <div>
              <h3 className="font-display font-bold text-sm text-foreground mb-1">
                {tip.title[lang]}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tip.content[lang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsSection;

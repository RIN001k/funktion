const PARAGRAPH_1 =
  "the funktion is led by two students from the university of klagenfurt with one simple idea — to make klagenfurt a little more alive and create events people actually want to go to.";

const PARAGRAPH_2 =
  "this semester, we’re mixing things up — new places, different music and all kinds of event formats. from open airs and workshops to bar and club nights, we want every funktion to feel a little different.";

const PARAGRAPH_3 =
  "we don’t really have a formula. some ideas work, some are a little crazy, but we’re always ready to try something new and see where it takes us.";

const PARAGRAPH_4 =
  "everything we do is made possible by our student community. every ticket, every person who shows up and every friend you bring helps us keep creating new events in lovely klagefornia.";

export default function AboutTextCollage() {
  return (
    <div className="flex justify-center gap-3 text-[8px] leading-[10px] font-helvetica lowercase text-ink">
      <div className="flex flex-col gap-5 w-[65px] text-left font-normal">
        <p>{PARAGRAPH_1}</p>
        <p>{PARAGRAPH_3}</p>
      </div>
      <div className="flex flex-col gap-5 w-[58px] text-right font-normal mt-6">
        <p>{PARAGRAPH_2}</p>
        <p>{PARAGRAPH_4}</p>
      </div>
    </div>
  );
}

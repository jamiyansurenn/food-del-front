import Image from "next/image";

export default function OrderCartFood() {
  return (
    <div>
      <div className="w-full h-[120px] flex gap-3">
        <Image
          src="/TestFood.png"
          width={200}
          height={200}
          alt="ordedFood"
          className="w-[140px] h-[120px] rounded-lg object-cover object-center"
        />
        <div className="flex flex-col justify-between py-2">
          <div>
            <h1 className="text-[18px] font-[540] text-[#ef4444]">
              Sunshine Stackers
            </h1>
            <p className="text-[14px] text-[#404040]">
              Fluffy pancakes stacked with fruits, cream, syrup, and powdered
              sugar.
            </p>
          </div>
          <div className="flex justify-between">
            <p>- 1 +</p>
            <p>$12.99</p>
          </div>
        </div>
      </div>
      <div className="text-[#aaaab6]">
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - -
      </div>
    </div>
  );
}
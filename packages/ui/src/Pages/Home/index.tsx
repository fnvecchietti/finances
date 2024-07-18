import { NumericFormat } from "react-number-format";

const WalletCard = ({
  balance,
  movements,
  name,
}: {
  balance: number;
  movements: number;
  name: string;
}) => {
  if (!balance || !movements || !name) return <></>;

  return (
    <div className="border-gray-200 p-2">
      <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-magenta-500">
        <dl className="grid max-w-screen-xl grid-cols-4 gap-2 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-1 dark:text-white sm:p-8">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">
              <NumericFormat
                prefix="$"
                displayType="text"
                value={balance}
                allowLeadingZeros
                thousandSeparator=","
              />
            </dt>
            <dd className="text-gray-500 dark:text-black">Balance</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{movements}</dt>
            <dd className="text-gray-500 dark:text-black">Movements</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{name}</dt>
            <dd className="text-gray-500 dark:text-black">Name</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

function Home() {
  return (
    <div className="flex w-full flex-wrap justify-center items-center ">
      
    </div>
  );
}

export default Home;

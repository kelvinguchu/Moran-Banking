import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation"; // Ensure you import from "next/navigation"
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback(
    async (public_token: string) => {
      setLoading(false);
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    [user, router]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const handleOpen = () => {
    setLoading(true);
    open();
  };

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={handleOpen}
          disabled={!ready || loading}
          className='plaidlink-primary'>
          {loading ? (
            <>
              <Loader2 size={20} className='animate-spin' /> &nbsp;
              Connecting...
            </>
          ) : (
            "Connect bank"
          )}
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={handleOpen}
          variant='ghost'
          className='plaidlink-ghost'>
          <Image
            src='/icons/connect-bank.svg'
            alt='connect bank'
            width={24}
            height={24}
          />
          <p className='hidden text-[16px] font-semibold text-black-2 xl:block'>
            Connect bank
          </p>
        </Button>
      ) : (
        <Button onClick={handleOpen} className='plaidlink-default'>
          <Image
            src='/icons/connect-bank.svg'
            alt='connect bank'
            width={24}
            height={24}
          />
          <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;

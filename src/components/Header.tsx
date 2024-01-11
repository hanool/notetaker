import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { api } from "~/utils/api";

export const Header = () => {
    const { data: sessionData } = useSession();
    return (
        <div className="flex flex-row min-w-full justify-around">
            <div className="flex-1 text-3xl font-bold">
                {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : ""}
            </div>
            <div>
                <div>
                    {sessionData?.user ? (
                        <button
                            onClick={() => void signOut()}>
                            SignOut
                        </button>
                    ) : (
                        <button onClick={() => void signIn()}>
                            SignIn
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

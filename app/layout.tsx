import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <header className={styles.header}>
            <Image
              src="/Chuckarooni.jpeg"
              alt="Chuck Norris"
              width={251}
              height={201}
            />
            <h1>Chuck's jokes for CGI</h1>
          </header>
          <section className={styles.container}>
            <main className={styles.main}>{children}</main>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}

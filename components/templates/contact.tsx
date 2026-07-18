import { useState, type FC, type FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageSection } from '@/components/atoms/page-section';
import { useI18n } from '@/contexts/i18nContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface ContactMePageProps {}

const ContactMePage: FC<ContactMePageProps> = ({}) => {
  const { t } = useI18n();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Response>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, name, message }),
    };

    setIsLoading(true);
    const res = await fetch('/api/v1/mail/send', options);
    setIsLoading(false);
    setResponse(res);
  };

  return (
    <PageSection.Container
      label={t('contact.sectionLabel')}
      className="bg-stone-200 text-black"
    >
      <PageSection.Paragraph>
        <PageSection.Title align="left">{t('contact.title')}</PageSection.Title>
        <PageSection.Title>{t('contact.findMeTitle')}</PageSection.Title>
        <div className="flex justify-center">
          {t('contact.lead')}
          <br />
          {t('contact.channels')}
        </div>
        <ul className="flex flex-row flex-wrap justify-evenly gap-4">
          <motion.li
            whileHover={{
              scale: 1.25,
              transition: { ease: 'circInOut', duration: 0.25 },
            }}
          >
            <Link
              className="flex items-center font-bold gap-2 overflow-hidden w-max text-slate-800"
              href="https://github.com/giladt"
              target="blank"
            >
              <FontAwesomeIcon icon={faGithub} size="4x" />
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.25,
              transition: { ease: 'circInOut', duration: 0.25 },
            }}
          >
            <Link
              className="flex items-center font-bold gap-2 overflow-hidden w-max text-sky-600"
              href="https://www.linkedin.com/in/gilad-tsabar"
              target="blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size="4x" />
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.25,
              transition: { ease: 'circInOut', duration: 0.25 },
            }}
          >
            <Link
              className="flex items-center font-bold gap-2 overflow-hidden w-max text-red-400"
              href="mailto:gilad@tsabar.net"
              target="blank"
            >
              <FontAwesomeIcon icon={faEnvelope} size="4x" />
            </Link>
          </motion.li>
        </ul>
        <div className="flex justify-center">{t('contact.alternative')}</div>
        {!response && !isLoading && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -1000 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4
            w-full py-2 
            rounded-lg
          "
          >
            <input
              type="text"
              title={t('contact.namePlaceholder')}
              placeholder={t('contact.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-black/10 
              border border-slate-900 rounded-lg 
              text-slate-900 placeholder:text-slate-700
              hover:bg-slate-200 h-10 p-2 shadow-lg"
            />
            <input
              type="email"
              title={t('contact.emailPlaceholder')}
              placeholder={t('contact.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/10 
              border border-slate-900 rounded-lg 
              text-slate-900 placeholder:text-slate-700
              hover:bg-slate-200 h-10 p-2 shadow-lg"
            />
            <textarea
              rows={10}
              placeholder={t('contact.messagePlaceholder')}
              title={t('contact.messagePlaceholder')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="bg-black/10 
              border border-slate-900 rounded-lg 
              text-slate-900 placeholder:text-slate-700
              hover:bg-slate-200 p-2 shadow-lg"
            />
            <button
              type="submit"
              className="bg-slate-900 rounded-lg text-white 
              hover:bg-slate-500 h-10"
            >
              {t('contact.send')}
            </button>
          </motion.form>
        )}
        <div>
          {!response && isLoading && (
            <p
              className="
            flex flex-col gap-4
            w-full p-4 
            rounded-lg h-72 mt-20 
            items-center justify-center 
            bg-stone-300 shadow-inner
          "
            >
              {t('contact.sending')}
            </p>
          )}
          {response && response.status === 200 && (
            <div
              className="
            flex flex-col gap-4
            w-full p-4 
            rounded-lg h-72 mt-20 
            items-center justify-center 
            bg-stone-300 shadow-inner
          "
            >
              <p>{t('contact.success')}</p>
              <button
                className="flex w-2/3 p-4 m-4 justify-center items-center rounded-lg bg-white/50 hover:bg-white/70 shadow-lg hover:shadow-xs"
                onClick={() => {
                  setName('');
                  setEmail('');
                  setMessage('');
                  setResponse(undefined);
                }}
              >
                {t('contact.close')}
              </button>
            </div>
          )}
          {response && response.status !== 200 && (
            <div
              className="
            flex flex-col gap-4
            w-full p-4 
            rounded-lg h-72 mt-20 
            items-center justify-center 
            bg-stone-300 shadow-inner
          "
            >
              <p>{t('contact.error')}</p>
              <button
                className="flex w-2/3 p-4 m-4 justify-center items-center rounded-lg bg-white/50 hover:bg-white/70 shadow-lg hover:shadow-xs"
                onClick={() => {
                  setResponse(undefined);
                }}
              >
                {t('contact.backToMessage')}
              </button>
            </div>
          )}
        </div>
      </PageSection.Paragraph>
    </PageSection.Container>
  );
};

export default ContactMePage;
